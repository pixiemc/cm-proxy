import { z } from "zod";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  a: z.array(
    z.object({
      a: z.string(),
      b: z.string(),
    })
  ),
});

export default {
  className: "cosmetic.ServerCosmeticsPopulatePacket",
  body: schema,
} as PacketDefinition<typeof schema>;
