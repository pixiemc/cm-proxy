import { z } from "zod";
import { cosmeticSetting, cosmeticSlot } from "~/protocol/common.js";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  uuid: z.string().uuid(),
  skinTexture: z.string().nullish(),
  equippedCosmetics: z.record(cosmeticSlot, z.string()).nullish(),
  cosmeticSettings: z.record(z.string(), z.array(cosmeticSetting)).nullish(),
});

export default {
  className: "cosmetic.outfit.ServerCosmeticOutfitSelectedResponsePacket",
  body: schema,
} as PacketDefinition<typeof schema>;
