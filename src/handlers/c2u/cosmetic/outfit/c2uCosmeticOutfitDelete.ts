import { and, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { outfits } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import cosmeticOutfitDelete from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitDelete.js";

export default {
  def: cosmeticOutfitDelete,
  async handle(client, packet) {
    const { id } = packet.body!;

    await db
      .delete(outfits)
      .where(and(eq(outfits.id, id), eq(outfits.ownerId, client.profile.id)));
    await client.sendResponse(packet);

    return { cancelled: true };
  },
} as Handler<typeof cosmeticOutfitDelete>;
