import { z } from "zod";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  key: z.string(),
  metadata: z.record(z.string(), z.any()),
});

export default {
  className: "telemetry.ClientTelemetryPacket",
  body: schema,
} as PacketDefinition<typeof schema>;
