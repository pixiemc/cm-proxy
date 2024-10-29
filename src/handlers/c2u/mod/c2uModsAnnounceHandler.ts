import { Handler } from "~/handlers/index.js";
import modsAnnounce from "~/protocol/packets/mod/modsAnnounce.js";
export default {
  def: modsAnnounce,
  async handle() {
    return { cancelled: true };
  },
} as Handler<typeof modsAnnounce>;
