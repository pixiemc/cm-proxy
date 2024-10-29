import { z } from "zod";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  id: z.string(),
  state: z.boolean(),
});

export default {
  className: "cosmetic.outfit.ClientCosmeticOutfitUpdateFavoriteStatePacket",
  body: schema,
} as PacketDefinition<typeof schema>;
