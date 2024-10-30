import { Handler } from "~/handlers/index.js";
import cosmeticOutfitSelect from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitSelect.js";

export default {
  def: cosmeticOutfitSelect,
  async handle(client, packet) {
    const { a: id } = packet.body!;

    await client.selectOutfit(id);
    await client.sendResponse(packet);
    return { cancelled: true };
  },
} as Handler<typeof cosmeticOutfitSelect>;
