import { Handler } from "~/handlers/index.js";
import noticesPopulate from "~/protocol/packets/notices/noticesPopulate.js";
export default {
  def: noticesPopulate,
  async handle(client, packet) {
    packet.body!.a.push({
      a: "pixie",
      b: "SALE",
      c: {
        sale_name: "pixie.rip",
        sale_name_compact: "pixie",
        discount: 100,
        display_time: false,
        tooltip: "Pixie is active\n and has given\n you every cosmetic.",
      },
      d: false,
      e: Date.now(),
      f: 95646663366000,
    });
    return packet;
  },
} as Handler<typeof noticesPopulate>;
