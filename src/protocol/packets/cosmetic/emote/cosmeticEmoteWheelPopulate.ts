import { z } from "zod";
import { emoteWheel } from "~/protocol/common.js";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  a: z.array(emoteWheel),
});

export default {
  className: "cosmetic.emote.ServerCosmeticEmoteWheelPopulatePacket",
  body: schema,
} as PacketDefinition<typeof schema>;
