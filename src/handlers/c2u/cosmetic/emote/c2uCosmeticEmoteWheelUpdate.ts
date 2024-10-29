import { and, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { emoteWheels } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import cosmeticEmoteWheelUpdate from "~/protocol/packets/cosmetic/emote/cosmeticEmoteWheelUpdate.js";

export default {
  def: cosmeticEmoteWheelUpdate,
  async handle(client, packet) {
    const { a: id, b: index, c: value } = packet.body!;

    const emoteWheel = (
      await db
        .select()
        .from(emoteWheels)
        .where(
          and(
            eq(emoteWheels.ownerId, client.profile.id),
            eq(emoteWheels.id, id)
          )
        )
    )[0];
    if (!emoteWheel) return;
    (emoteWheel.slots as any)[index] = value;

    await db
      .update(emoteWheels)
      .set({ slots: emoteWheel.slots, updatedAt: new Date() })
      .where(eq(emoteWheels.id, id));
    return { cancelled: true };
  },
} as Handler<typeof cosmeticEmoteWheelUpdate>;
