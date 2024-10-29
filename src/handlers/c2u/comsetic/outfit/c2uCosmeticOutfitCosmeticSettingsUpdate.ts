import { and, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { outfits, users } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import { cosmeticIds } from "~/index.js";
import cosmeticOutfitCosmeticSettingsUpdate from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitCosmeticSettingsUpdate.js";
import responseActionPacket from "~/protocol/packets/response/responseActionPacket.js";

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

    if (!cosmeticIds.has(cosmeticId)) return;

    (outfit!.cosmeticSettings as any)[cosmeticId] = settings;

    await db
      .update(outfits)
      .set({ cosmeticSettings: outfit!.cosmeticSettings })
      .where(
        and(eq(outfits.id, outfitId), eq(outfits.ownerId, client.profile.id))
      );

    await client.sendClientPacket({
      uuid: packet.uuid,
      className: responseActionPacket.className,
      body: { a: true },
    });
    return { cancelled: true };
  },
} as Handler<typeof cosmeticOutfitCosmeticSettingsUpdate>;
