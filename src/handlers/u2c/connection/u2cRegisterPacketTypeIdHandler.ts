import { Handler } from "~/handlers/index.js";
import registerPacketTypeId from "~/protocol/packets/connection/registerPacketTypeId.js";
export default {
  def: registerPacketTypeId,
  async handle(client, packet) {
    const { body } = packet;
    client.clientPackets[body!.b] = body!.a;
  },
} as Handler<typeof registerPacketTypeId>;
