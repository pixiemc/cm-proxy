import { z } from "zod";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  a: z.boolean(), // success
  b: z.string().nullish(), // error message
});

export default {
  className: "response.ResponseActionPacket",
  body: schema,
} as PacketDefinition<typeof schema>;
