import { asc, count, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { outfits } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import cosmeticOutfitPopulate from "~/protocol/packets/cosmetic/outfit/cosmeticOutfitPopulate.js";

export default {
  def: cosmeticOutfitPopulate,
  async handle(client, packet) {
    if (
      (
        await db
          .select({ value: count() })
          .from(outfits)
          .where(eq(outfits.ownerId, client.profile.id))
      ).reduce((partialSum, a) => partialSum + a.value, 0) == 0
    ) {
      await db.insert(outfits).values(
        packet.body!.outfits.map((o) => ({
          ownerId: client.profile.id,
          name: o.b,
          skinTexture: o.c,
          equippedCosmetics: o.d,
          cosmeticSettings: o.e,
          selected: o.f,
          favoritedAt: o.h ? new Date(o.h) : null,
          skinId: o.j,
        }))
      );
    }

    const outfitList = await db
      .select()
      .from(outfits)
      .where(eq(outfits.ownerId, client.profile.id))
      .orderBy(asc(outfits.createdAt));

    packet.body!.outfits = outfitList.map((o) => ({
      a: o.id,
      b: o.name,
      c: o.skinTexture,
      d: o.equippedCosmetics as any,
      e: o.cosmeticSettings as any,
      f: o.selected,
      g: o.createdAt.getTime(),
      h: o.favoritedAt?.getTime(),
      j: o.skinId,
    }));
    return packet;
  },
} as Handler<typeof cosmeticOutfitPopulate>;
