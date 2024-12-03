import { z } from "zod";
import { notice } from "~/protocol/common.js";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  a: z.array(notice),
});

export default {
  className: "notices.ServerNoticePopulatePacket",
  body: schema,
} as PacketDefinition<typeof schema>;
