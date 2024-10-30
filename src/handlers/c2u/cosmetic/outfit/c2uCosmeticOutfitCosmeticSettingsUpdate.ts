import { and, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { outfits } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import { cosmeticIds } from "~/index.js";
import cosmeticOutfitCosmeticSettingsUpdate from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitCosmeticSettingsUpdate.js";

export default {
  def: cosmeticOutfitCosmeticSettingsUpdate,
  async handle(client, packet) {
    const { a: outfitId, b: cosmeticId, c: settings } = packet.body!;

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
    if (!cosmeticIds.has(cosmeticId))
      return await client.sendResponse(packet, false, "Invalid cosmetic id");

    (outfit!.cosmeticSettings as any)[cosmeticId] = settings;

    await db
      .update(outfits)
      .set({ cosmeticSettings: outfit!.cosmeticSettings })
      .where(
        and(eq(outfits.id, outfitId), eq(outfits.ownerId, client.profile.id))
      );

    await client.sendResponse(packet);

    await client.sendOutfitToSubscribers();

    return { cancelled: true };
  },
} as Handler<typeof cosmeticOutfitCosmeticSettingsUpdate>;
