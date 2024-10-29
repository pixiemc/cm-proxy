import { Handler } from "~/handlers/index.js";
import { cosmeticIds } from "~/index.js";
import cosmeticsUserUnlocked from "~/protocol/packets/cosmetic/cosmeticsUserUnlocked.js";

export default {
  def: cosmeticsUserUnlocked,
  async handle(client, packet) {
    console.log("got funny cosmetics unlocked packet");

    for (const cosmeticId of cosmeticIds) {
      packet.body!.d[cosmeticId] = {
        gifted_by: null,
        unlocked_at: Date.now(),
        wardrobe_unlock: true,
      };
    }

    return packet;
  },
} as Handler<typeof cosmeticsUserUnlocked>;
