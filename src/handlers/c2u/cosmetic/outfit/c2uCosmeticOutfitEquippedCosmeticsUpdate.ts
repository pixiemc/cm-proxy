import { and, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { outfits } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import cosmeticOutfitEquippedCosmeticsUpdate from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitEquippedCosmeticsUpdate.js";
import responseActionPacket from "~/protocol/packets/response/responseActionPacket.js";

export default {
  def: cosmeticOutfitEquippedCosmeticsUpdate,
  async handle(client, packet) {
    const { a: outfitId, b: slot, c: cosmetic } = packet.body!;

    const outfit = (
      await db
        .select()
        .from(outfits)
        .where(
          and(eq(outfits.id, outfitId), eq(outfits.ownerId, client.profile.id))
        )
        .limit(1)
    )[0];
    if (!outfit) return;

    (outfit!.equippedCosmetics as any)[slot] = cosmetic;

    await db
      .update(outfits)
      .set({ equippedCosmetics: outfit!.equippedCosmetics })
      .where(
        and(eq(outfits.id, outfitId), eq(outfits.ownerId, client.profile.id))
      );
    await client.sendClientPacket({
      uuid: packet.uuid,
      className: responseActionPacket.className,
      body: { a: true },
    });

    await client.sendOutfitToSubscribers();
    return { cancelled: true };
  },
} as Handler<typeof cosmeticOutfitEquippedCosmeticsUpdate>;
