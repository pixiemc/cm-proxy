import ky from "ky";

export const generalHttpClient = ky.extend({
  headers: {
    "User-Agent": "Acute (github.com/acutegg/acute)",
  },
});
