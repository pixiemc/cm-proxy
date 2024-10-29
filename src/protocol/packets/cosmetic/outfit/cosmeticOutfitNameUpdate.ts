import { z } from "zod";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  id: z.string(),
  name: z.string().max(22),
});

export default {
  className: "cosmetic.outfit.ClientCosmeticOutfitNameUpdatePacket",
  body: schema,
} as PacketDefinition<typeof schema>;
