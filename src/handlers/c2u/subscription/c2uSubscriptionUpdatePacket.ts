import { Handler } from "~/handlers/index.js";
import responseActionPacket from "~/protocol/packets/response/responseActionPacket.js";
import subscriptionUpdatePacket from "~/protocol/packets/subscription/subscriptionUpdatePacket.js";
export default {
  def: subscriptionUpdatePacket,
  async handle(client, packet) {
    const { a: uuids, b: unsubscribeFromAll, c: subscribe } = packet.body!;
    if (unsubscribeFromAll) {
      for (const subscription of client.subscribedTo) {
        await client.unsubscribe(subscription);
      }

      await client.sendClientPacket({
        uuid: packet.uuid,
        className: responseActionPacket.className,
        body: { a: true },
      });
      return;
    }

    for (const newSubscription of uuids ?? []) {
      subscribe
        ? await client.subscribe(newSubscription)
        : await client.unsubscribe(newSubscription);
    }

    await client.sendClientPacket({
      uuid: packet.uuid,
      className: responseActionPacket.className,
      body: { a: true },
    });
  },
} as Handler<typeof subscriptionUpdatePacket>;
