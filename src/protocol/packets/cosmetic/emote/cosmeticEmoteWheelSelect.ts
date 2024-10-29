import { z } from "zod";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  a: z.string(), // id
});

export default {
  className: "cosmetic.emote.ClientCosmeticEmoteWheelSelectPacket",
  body: schema,
} as PacketDefinition<typeof schema>;
