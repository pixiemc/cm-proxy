import { and, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { outfits } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import cosmeticOutfitSkinUpdate from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitSkinUpdate.js";

export default {
  def: cosmeticOutfitSkinUpdate,
  async handle(client, packet) {
    const { a: outfitId, b: skinTexture, c: skinId } = packet.body!;
    console.log(skinId, skinTexture);

    const outfit = (
      await db
        .select()
        .from(outfits)
        .where(
          and(eq(outfits.id, outfitId), eq(outfits.ownerId, client.profile.id))
        )
        .limit(1)
    )[0];

    if (!outfit)
      return await client.sendResponse(packet, false, "Outfit not found");

    await db
      .update(outfits)
      .set({ skinId, skinTexture })
      .where(
        and(eq(outfits.id, outfitId), eq(outfits.ownerId, client.profile.id))
      );

    await client.sendResponse(packet);

    await client.sendOutfitToSubscribers();

    return { cancelled: true };
  },
} as Handler<typeof cosmeticOutfitSkinUpdate>;
