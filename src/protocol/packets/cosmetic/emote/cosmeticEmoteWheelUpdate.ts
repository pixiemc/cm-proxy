import { z } from "zod";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  a: z.string(), // id
  b: z.number(), // index
  c: z.string().nullish(), // value
});

export default {
  className: "cosmetic.emote.ClientCosmeticEmoteWheelUpdatePacket",
  body: schema,
} as PacketDefinition<typeof schema>;
