import { z } from "zod";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  b: z.string(),
  a: z.array(z.string()),
  c: z.enum(["FABRIC", "FORGE"]),
  d: z.string(),
  modpackId: z.string().nullish(),
});

export default {
  className: "mod.ClientModsAnnouncePacket",
  body: schema,
} as PacketDefinition<typeof schema>;
