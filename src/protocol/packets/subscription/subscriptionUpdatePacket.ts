import { z } from "zod";
import { PacketDefinition } from "~/protocol/packets.js";

const schema = z.object({
  a: z.array(z.string().uuid()).nullish(), // uuids
  b: z.boolean(), // unsubscribe from all
  c: z.boolean() // new subscription
});

export default {
  className: "subscription.SubscriptionUpdatePacket",
  body: schema,
} as PacketDefinition<typeof schema>;
