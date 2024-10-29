import { z } from "zod";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  id: z.string(),
});

export default {
  className: "cosmetic.outfit.ClientCosmeticOutfitDeletePacket",
  body: schema,
} as PacketDefinition<typeof schema>;
