import { and, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { outfits, users } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import cosmeticOutfitCreate from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitCreate.js";
import cosmeticOutfitPopulate from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitPopulate.js";

export default {
  def: cosmeticOutfitCreate,
  async handle(client, packet) {
    const {
      name,
      skin_id: skinId,
      equipped_cosmetics: equippedCosmetics,
      cosmetic_settings: cosmeticSettings,
    } = packet.body!;
    const newOutfit = (
      await db
        .insert(outfits)
        .values({
          ownerId: client.profile.id,
          name,
          skinId,
          equippedCosmetics,
          cosmeticSettings,
          selected: false,
        })
        .returning()
    )[0]!;

    await client.resendOutfits(packet.uuid, [newOutfit.id]);
    return { cancelled: true };
  },
} as Handler<typeof cosmeticOutfitCreate>;
