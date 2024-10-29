import { z } from "zod";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  a: z.string(), // outfit id
});

export default {
  className: "cosmetic.outfit.ClientCosmeticOutfitSelectPacket",
  body: schema,
} as PacketDefinition<typeof schema>;
