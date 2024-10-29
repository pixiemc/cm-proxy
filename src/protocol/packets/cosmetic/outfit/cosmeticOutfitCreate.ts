import { z } from "zod";
import { cosmeticSetting, cosmeticSlot } from "~/protocol/common.js";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  name: z.string(),
  skin_id: z.string(),
  equipped_cosmetics: z.record(cosmeticSlot, z.string()),
  cosmetic_settings: z.record(z.string(), z.array(cosmeticSetting)),
});

export default {
  className: "cosmetic.outfit.ClientCosmeticOutfitCreatePacket",
  body: schema,
} as PacketDefinition<typeof schema>;
