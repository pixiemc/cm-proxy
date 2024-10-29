import { z } from "zod";
import { cosmeticSetting } from "~/protocol/common.js";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  a: z.string(), // outfit id
  b: z.string(), // cosmetic id
  c: z.array(cosmeticSetting), // settings
});

export default {
  className: "cosmetic.outfit.ClientCosmeticOutfitCosmeticSettingsUpdatePacket",
  body: schema,
} as PacketDefinition<typeof schema>;
