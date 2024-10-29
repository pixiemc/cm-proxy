import { z } from "zod";
import { cosmeticSlot } from "~/protocol/common.js";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  a: z.string(), // outfit id
  b: cosmeticSlot, // slot
  c: z.string().nullish(), // cosmetic id
});

export default {
  className:
    "cosmetic.outfit.ClientCosmeticOutfitEquippedCosmeticsUpdatePacket",
  body: schema,
} as PacketDefinition<typeof schema>;
