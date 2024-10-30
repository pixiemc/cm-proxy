import { and, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { outfits } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import cosmeticOutfitNameUpdate from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitNameUpdate.js";

export default {
  def: cosmeticOutfitNameUpdate,
  async handle(client, packet) {
    const { id, name } = packet.body!;

    await db
      .update(outfits)
      .set({ name })
      .where(and(eq(outfits.id, id), eq(outfits.ownerId, client.profile.id)));
    await client.sendResponse(packet);
    return { cancelled: true };
  },
} as Handler<typeof cosmeticOutfitNameUpdate>;
