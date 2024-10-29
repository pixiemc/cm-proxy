import { ServerWebSocket } from "bun";
import { WebSocketData } from "./index.js";
import { db } from "./db/index.js";
import { outfits, users } from "./db/schema.js";
import { decodePacket, encodePacket, Packet } from "./protocol/index.js";
import { reverseObj } from "./utils/generic.js";
import registerPacketTypeId from "./protocol/packets/connection/registerPacketTypeId.js";
import {
  clientToUpstreamHandlers,
  upstreamToClientHandlers,
} from "./handlers/index.js";
import { and, count, eq, inArray } from "drizzle-orm";
import cosmeticOutfitPopulate from "./protocol/packets/cosmetic/outfit/cosmeticOutfitPopulate.js";
export class Client {
  profile: {
    id: string;
    name: string;
  };
  #ws: ServerWebSocket<WebSocketData> | null = null;
  #upstreamWs: WebSocket;
  clientPackets: Record<number, string> = {
    0: "connection.ConnectionRegisterPacketTypeIdPacket",
  };
  upstreamPackets: Record<number, string> = {
    0: "connection.ConnectionRegisterPacketTypeIdPacket",
  };
  startupPackets: Buffer[] = [];
  initialized = false;

  constructor(profile: { id: string; name: string }, upstreamWs: WebSocket) {
    this.profile = profile;
    this.#upstreamWs = upstreamWs;
  }
  async open(ws: ServerWebSocket<WebSocketData>) {
    this.#ws = ws;

    console.log(`${this.profile.name} connected`);

    await db
      .insert(users)
      .values({ id: this.profile.id, username: this.profile.name })
      .onConflictDoUpdate({
        target: users.id,
        set: { username: this.profile.name },
      });

    this.initialized = true;

    this.#upstreamWs.addEventListener("message", async (event) => {
      if (!(event.data instanceof Buffer)) return;

      await this.onUpstreamMessage(event.data);
    });
    for (const packet of this.startupPackets) {
      await this.onUpstreamMessage(packet);
    }
  }

  async selectOutfit(newOutfit: string) {
    await db
      .update(outfits)
      .set({ selected: false })
      .where(
        and(eq(outfits.selected, true), eq(outfits.ownerId, this.profile.id))
      );

    await db
      .update(outfits)
      .set({ selected: true })
      .where(
        and(eq(outfits.id, newOutfit), eq(outfits.ownerId, this.profile.id))
      );
  }

  async resendOutfits(
    replyId: string | undefined = undefined,
    outfitIds: string[] | undefined = undefined
  ) {
    const outfitList = await db
      .select()
      .from(outfits)
      .where(
        and(
          eq(outfits.ownerId, this.profile.id),
          outfitIds && inArray(outfits.id, outfitIds)
        )
      );

    await this.sendClientPacket({
      uuid: replyId,
      className: cosmeticOutfitPopulate.className,
      body: {
        outfits: outfitList.map((o) => ({
          a: o.id,
          b: o.name,
          c: o.skinTexture,
          d: o.equippedCosmetics as any,
          e: o.cosmeticSettings as any,
          f: o.selected,
          g: o.createdAt.getTime(),
          h: o.favoritedAt,
          j: o.skinId,
        })),
      },
    });
  }

  async onClientMessage(message: Buffer) {
    let packet = decodePacket(this.upstreamPackets, message);

    if (!packet) {
      this.#upstreamWs.send(message);
      return null;
    }

    const handler = clientToUpstreamHandlers.find(
      (a) => a.def.className == packet!.className
    );
    if (handler) {
      const resultingPacket = await handler.handle(this, packet);

      if (resultingPacket) {
        if ("className" in resultingPacket) {
          packet = resultingPacket;
        }

        if ("cancelled" in resultingPacket && resultingPacket.cancelled) return;
      }
    }

    await this.sendUpstreamPacket(packet);
  }

  async onUpstreamMessage(message: Buffer) {
    let packet = decodePacket(this.clientPackets, message);
    if (!packet) {
      this.#ws!.sendBinary(message);
      return null;
    }

    const handler = upstreamToClientHandlers.find(
      (a) => a.def.className == packet!.className
    );
    if (!handler) {
      this.#ws!.sendBinary(message);
      return null;
    }

    const resultingPacket = await handler.handle(this, packet);
    if (!resultingPacket) {
      this.#ws!.sendBinary(message);
      return null;
    }
    if ("className" in resultingPacket) {
      packet = resultingPacket;
    }

    if ("cancelled" in resultingPacket && resultingPacket.cancelled) return;

    await this.sendClientPacket(packet);
  }

  async sendUpstreamPacket(packet: Packet<any>) {
    const invertedOutgoingMap = reverseObj(this.upstreamPackets) as Record<
      string,
      number
    >;

    const buffer = encodePacket(invertedOutgoingMap, packet);

    if (!buffer)
      return console.log(
        "warn: failed to send packet to upstream because the client has not registered it yet"
      );

    this.#upstreamWs.send(buffer);
  }

  async sendClientPacket(packet: Packet<any>) {
    let invertedOutgoingMap = reverseObj(this.clientPackets) as Record<
      string,
      number
    >;
    if (!invertedOutgoingMap[packet.className]) {
      const id = this.getNextPacketId(this.clientPackets);
      await this.sendClientPacket({
        className: registerPacketTypeId.className,
        body: {
          className: packet.className,
          packetId: id,
        },
      });
      this.clientPackets[id] = packet.className;
      invertedOutgoingMap = reverseObj(this.clientPackets) as Record<
        string,
        number
      >;
    }

    let buffer = encodePacket(invertedOutgoingMap, packet);
    if (!buffer) {
      return false;
    }

    this.#ws!.sendBinary(buffer);

    return true;
  }

  getNextPacketId(packetMap: Record<number, string>) {
    const ids = Object.keys(packetMap).map((a) => parseInt(a));
    return ids[ids.length - 1]! + 1;
  }
}
