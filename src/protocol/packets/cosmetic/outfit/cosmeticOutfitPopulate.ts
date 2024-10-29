import { z } from "zod";
import { cosmeticOutfit } from "~/protocol/common.js";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  outfits: z.array(cosmeticOutfit),
});

export default {
  className: "cosmetic.outfit.ServerCosmeticOutfitPopulatePacket",
  body: schema,
} as PacketDefinition<typeof schema>;
