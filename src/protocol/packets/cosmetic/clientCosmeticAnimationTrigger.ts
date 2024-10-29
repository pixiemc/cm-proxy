import { z } from "zod";
import { cosmeticSlot } from "~/protocol/common.js";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  a: cosmeticSlot,
  b: z.string()
});

export default {
  className: "cosmetic.ClientCosmeticAnimationTriggerPacket",
  body: schema,
} as PacketDefinition<typeof schema>;
