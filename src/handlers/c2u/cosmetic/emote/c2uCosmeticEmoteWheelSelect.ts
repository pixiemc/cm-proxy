import { and, eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { emoteWheels } from "~/db/schema.js";
import { Handler } from "~/handlers/index.js";
import cosmeticEmoteWheelSelect from "~/protocol/packets/cosmetic/emote/cosmeticEmoteWheelSelect.js";

export default {
  def: cosmeticEmoteWheelSelect,
  async handle(client, packet) {
    const { a: id } = packet.body!;

    await db
      .update(emoteWheels)
      .set({ selected: false })
      .where(
        and(
          eq(emoteWheels.ownerId, client.profile.id),
          eq(emoteWheels.selected, true)
        )
      );

    await db
      .update(emoteWheels)
      .set({ selected: true })
      .where(
        and(eq(emoteWheels.ownerId, client.profile.id), eq(emoteWheels.id, id))
      );

    return { cancelled: true };
  },
} as Handler<typeof cosmeticEmoteWheelSelect>;
