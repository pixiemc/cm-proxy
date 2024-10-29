import { asc, count, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { emoteWheels } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import cosmeticEmoteWheelPopulate from "~/protocol/packets/cosmetic/emote/cosmeticEmoteWheelPopulate.js";

export default {
  def: cosmeticEmoteWheelPopulate,
  async handle(client, packet) {
    if (
      (
        await db
          .select({ value: count() })
          .from(emoteWheels)
          .where(eq(emoteWheels.ownerId, client.profile.id))
      ).reduce((partialSum, a) => partialSum + a.value, 0) == 0
    ) {
      await db.insert(emoteWheels).values(
        packet.body!.a.map((o) => ({
          ownerId: client.profile.id,
          selected: o.b,
          slots: o.c,
        }))
      );
    }

    const emoteWheelList = await db
      .select()
      .from(emoteWheels)
      .where(eq(emoteWheels.ownerId, client.profile.id))
      .orderBy(asc(emoteWheels.createdAt));

    packet.body!.a = emoteWheelList.map((o) => ({
      a: o.id,
      b: o.selected,
      c: o.slots as any,
      d: o.createdAt.getTime(),
      e: o.updatedAt?.getTime(),
    }));
    return packet;
  },
} as Handler<typeof cosmeticEmoteWheelPopulate>;
