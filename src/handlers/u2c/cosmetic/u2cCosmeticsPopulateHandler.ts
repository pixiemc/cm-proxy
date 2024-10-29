import { Handler } from "~/handlers/index.js";
import { addCosmeticIds } from "~/index.js";
import cosmeticsPopulate from "~/protocol/packets/cosmetic/cosmeticsPopulate.js";

export default {
  def: cosmeticsPopulate,
  async handle(client, packet) {
    addCosmeticIds(
      // this is we dont have emote support yet, why? because i dont want to handle subscriptions yet
      packet.body!.a.map((a) => a.a)
    );
  },
} as Handler<typeof cosmeticsPopulate>;
