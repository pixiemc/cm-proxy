import { and, asc, count, desc, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { outfits, users } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import cosmeticOutfitPopulate from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitPopulate.js";
import cosmeticOutfitSelectedResponse from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitSelectedResponse.js";

export default {
  def: cosmeticOutfitSelectedResponse,
  async handle(client, packet) {
    const { uuid } = packet.body!;
    console.log("selected response packet");
    const selectedOutfit = (
      await db
        .select()
        .from(outfits)
        .where(and(eq(outfits.ownerId, uuid), eq(outfits.selected, true)))
    )[0];

    if (!selectedOutfit) return;

    packet.body!.cosmeticSettings = selectedOutfit.cosmeticSettings as any;
    packet.body!.equippedCosmetics = selectedOutfit.equippedCosmetics as any;
    packet.body!.skinTexture = selectedOutfit.skinTexture;

    return packet;
  },
} as Handler<typeof cosmeticOutfitSelectedResponse>;
