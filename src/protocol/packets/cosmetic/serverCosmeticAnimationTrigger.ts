import { z } from "zod";
import { cosmeticSlot } from "~/protocol/common.js";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  a: z.string().uuid(),
  b: cosmeticSlot,
  c: z.string()
});

export default {
  className: "cosmetic.ServerCosmeticAnimationTriggerPacket",
  body: schema,
} as PacketDefinition<typeof schema>;
