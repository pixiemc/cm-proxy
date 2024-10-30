import { z } from "zod";
export const cosmeticSlot = z.enum([
  "BACK",
  "EARS",
  "FACE",
  "FULL_BODY",
  "HAT",
  "PET",
  "TAIL",
  "ARMS",
  "SHOULDERS",
  "SUITS",
  "SHOES",
  "PANTS",
  "WINGS",
  "EFFECT",
  "CAPE",
  "EMOTE",
  "ICON",
  "TOP",
  "ACCESSORY",
  "HEAD",
]);

export const cosmeticSetting = z.object({
  a: z.string().nullish(), // id
  b: z.string(), // type
  c: z.boolean(), // enabled
  d: z.record(z.string(), z.any()), // data
});
export const cosmeticOutfit = z.object({
  a: z.string(), // id
  b: z.string(), // name
  c: z.string().nullish(), // skin texture
  d: z.record(cosmeticSlot, z.string()).nullish(), // equipped cosmetics
  e: z.record(z.string(), z.array(cosmeticSetting)).nullish(), // cosmetic settings
  f: z.boolean(), // selected
  g: z.number(), // created at
  h: z.number().nullish(), // favorited at,
  j: z.string().nullish(), // skin id
});
export const emoteWheel = z.object({
  a: z.string(), // id
  b: z.boolean(), // selected
  c: z.record(z.string(), z.string()), // slots
  d: z.number(), // created at
  e: z.number().nullish(), // updated at
});

function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}

export const readString = (view: DataView, offset: number) => {
  const length = view.getInt32(offset);
  offset += 4;

  const byteArray = new Uint8Array(
    view.buffer,
    offset,
    clamp(length, 0, view.buffer.byteLength - offset)
  );

  return new TextDecoder().decode(byteArray);
};

export const writeString = (view: DataView, offset: number, str: string) => {
  view.setInt32(offset, str.length);
  offset += 4;

  new Uint8Array(view.buffer, offset, str.length).set(
    new TextEncoder().encode(str)
  );
};
