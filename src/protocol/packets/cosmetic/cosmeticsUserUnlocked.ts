import { z } from "zod";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  b: z.boolean(),
  c: z.string().uuid().nullish(),
  d: z.record(
    z.string(),
    z.object({
      unlocked_at: z.number(),
      gifted_by: z.string().uuid().nullish(),
      wardrobe_unlock: z.boolean(),
    })
  ),
});

export default {
  className: "cosmetic.ServerCosmeticsUserUnlockedPacket",
  body: schema,
} as PacketDefinition<typeof schema>;
