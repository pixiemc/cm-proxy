import { z } from "zod";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  a: z.string(),
  b: z.number(),
});

export default {
  className: "connection.ConnectionRegisterPacketTypeIdPacket",
  body: schema,
} as PacketDefinition<typeof schema>;
