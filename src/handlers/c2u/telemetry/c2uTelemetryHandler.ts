import { Handler } from "~/handlers/index.js";
import telemetry from "~/protocol/packets/telemetry/telemetry.js";
export default {
  def: telemetry,
  async handle() {
    return { cancelled: true };
  },
} as Handler<typeof telemetry>;
