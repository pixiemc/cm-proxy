import { Client } from "./client.js";
import { env } from "./env.js";
import { generalHttpClient } from "./utils/http.js";

export let cosmeticIds = new Set<string>();

export const addCosmeticIds = (ids: string[]) =>
  ids.forEach((id) => cosmeticIds.add(id));
export type WebSocketData = {
  client: Client;
};
Bun.serve<WebSocketData>({
  port: env.PORT,
  async fetch(req, server) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return new Response(null, { status: 401 });
    }

    const userPassRaw = atob(authHeader.split(" ")[1]!);
    if (!userPassRaw.includes(":")) {
      return new Response(null, { status: 401 });
    }

    const username = userPassRaw.split(":")[0];
    const profile: { id: string; name: string } = await generalHttpClient
      .get("https://mowojang.matdoes.dev/" + username)
      .json();

    profile.id = profile.id.replace(
      /(.{8})(.{4})(.{4})(.{4})(.{12})/,
      "$1-$2-$3-$4-$5"
    );

    const upstreamWs = new WebSocket("wss://connect.essential.gg/v1", {
      // @ts-ignore - bun supports headers with websockets
      headers: {
        "essential-max-protocol-version": req.headers.get(
          "essential-max-protocol-version"
        ),
        authorization: req.headers.get("authorization"),
        "user-agent": req.headers.get("user-agent"),
      },
    });
    const client = new Client(profile, upstreamWs);

    upstreamWs.addEventListener("message", (event) => {
      if (!(event.data instanceof Buffer)) return;
      if (client.initialized) return;
      client.startupPackets.push(event.data);
    });

    await new Promise((resolve) =>
      upstreamWs.addEventListener("open", resolve)
    );

    if (
      server.upgrade(req, {
        headers: {
          "essential-protocol-version": "5",
        },
        data: {
          client,
        },
      })
    ) {
      return; // do not return a Response
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    open: async (ws) => await ws.data.client.open(ws),
    message: async (ws, message) => {
      if (message instanceof Buffer)
        await ws.data.client.onClientMessage(message);
    },
  }, // handlers
});
