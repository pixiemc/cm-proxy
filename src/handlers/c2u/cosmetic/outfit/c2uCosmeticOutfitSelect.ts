import { Handler } from "~/handlers/index.js";
import cosmeticOutfitSelect from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitSelect.js";
import responseActionPacket from "~/protocol/packets/response/responseActionPacket.js";

export default {
  def: cosmeticOutfitSelect,
  async handle(client, packet) {
    const { a: id } = packet.body!;

    await client.selectOutfit(id);
    await client.sendClientPacket({
      uuid: packet.uuid,
      className: responseActionPacket.className,
      body: { a: true },
    });
    return { cancelled: true };
  },
} as Handler<typeof cosmeticOutfitSelect>;