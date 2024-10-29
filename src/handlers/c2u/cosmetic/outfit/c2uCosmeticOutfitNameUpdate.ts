import { and, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { outfits } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import cosmeticOutfitNameUpdate from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitNameUpdate.js";
import responseActionPacket from "~/protocol/packets/response/responseActionPacket.js";

export default {
  def: cosmeticOutfitNameUpdate,
  async handle(client, packet) {
    const { id, name } = packet.body!;

    await db
      .update(outfits)
      .set({ name })
      .where(and(eq(outfits.id, id), eq(outfits.ownerId, client.profile.id)));
    await client.sendClientPacket({
      uuid: packet.uuid,
      className: responseActionPacket.className,
      body: { a: true },
    });
    return { cancelled: true };
  },
} as Handler<typeof cosmeticOutfitNameUpdate>;
