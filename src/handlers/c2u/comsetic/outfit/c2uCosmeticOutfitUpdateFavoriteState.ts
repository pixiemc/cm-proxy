import { and, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { outfits } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import cosmeticOutfitUpdateFavoriteState from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitUpdateFavoriteState.js";
import responseActionPacket from "~/protocol/packets/response/responseActionPacket.js";

export default {
  def: cosmeticOutfitUpdateFavoriteState,
  async handle(client, packet) {
    const { id, state } = packet.body!;

    await db
      .update(outfits)
      .set({ favoritedAt: state ? Date.now() : null })
      .where(and(eq(outfits.id, id), eq(outfits.ownerId, client.profile.id)));
    await client.sendClientPacket({
      uuid: packet.uuid,
      className: responseActionPacket.className,
      body: { a: true },
    });
    return { cancelled: true };
  },
} as Handler<typeof cosmeticOutfitUpdateFavoriteState>;
