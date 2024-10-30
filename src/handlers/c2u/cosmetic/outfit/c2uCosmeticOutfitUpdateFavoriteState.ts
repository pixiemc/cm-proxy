import { and, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { outfits } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import cosmeticOutfitUpdateFavoriteState from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitUpdateFavoriteState.js";

export default {
  def: cosmeticOutfitUpdateFavoriteState,
  async handle(client, packet) {
    const { id, state } = packet.body!;

    await db
      .update(outfits)
      .set({ favoritedAt: state ? new Date() : null })
      .where(and(eq(outfits.id, id), eq(outfits.ownerId, client.profile.id)));
    await client.sendResponse(packet);
    return { cancelled: true };
  },
} as Handler<typeof cosmeticOutfitUpdateFavoriteState>;
