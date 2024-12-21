import { z } from "zod";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  a: z.string(), // outfit id
  b: z.string().nullish(), // skin texture
  c: z.string().nullish(), // skin id
});

export default {
  className: "cosmetic.outfit.ClientCosmeticOutfitSkinUpdatePacket",
  body: schema,
} as PacketDefinition<typeof schema>;
