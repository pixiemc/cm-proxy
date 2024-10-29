import { and, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { outfits, users } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import cosmeticOutfitDelete from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitDelete.js";
import responseActionPacket from "~/protocol/packets/response/responseActionPacket.js";

export default {
  def: cosmeticOutfitDelete,
  async handle(client, packet) {
    const { id } = packet.body!;

    await db
      .delete(outfits)
      .where(and(eq(outfits.id, id), eq(outfits.ownerId, client.profile.id)));
    await client.sendClientPacket({
      uuid: packet.uuid,
      className: responseActionPacket.className,
      body: { a: true },
    });

    return { cancelled: true };
  },
} as Handler<typeof cosmeticOutfitDelete>;
