import { Handler } from "~/handlers/index.js";
import cosmeticAnimationTrigger from "~/protocol/packets/cosmetic/clientCosmeticAnimationTrigger.js";
import serverCosmeticAnimationTrigger from "~/protocol/packets/cosmetic/serverCosmeticAnimationTrigger.js";

export default {
  def: cosmeticAnimationTrigger,
  async handle(client, packet) {
    await client.sendToSubscribed({
      className: serverCosmeticAnimationTrigger.className,
      body: {
        a: client.profile.id,
        b: packet.body!.a,
        c: packet.body!.b,
      },
    });
    return { cancelled: true };
  },
} as Handler<typeof cosmeticAnimationTrigger>;
