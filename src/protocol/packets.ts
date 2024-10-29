import { ZodObject, ZodType, z } from "zod";
import registerPacketTypeId from "./packets/connection/registerPacketTypeId.js";
import telemetry from "./packets/telemetry/telemetry.js";
import modsAnnounce from "./packets/mod/modsAnnounce.js";
import cosmeticsUserUnlocked from "./packets/cosmetic/cosmeticsUserUnlocked.js";
import cosmeticsPopulate from "./packets/cosmetic/cosmeticsPopulate.js";
import cosmeticOutfitPopulate from "./packets/cosmetic/outfit/cosmeticOutfitPopulate.js";
import cosmeticOutfitEquippedCosmeticsUpdate from "./packets/cosmetic/outfit/cosmeticOutfitEquippedCosmeticsUpdate.js";
import cosmeticOutfitCosmeticSettingsUpdate from "./packets/cosmetic/outfit/cosmeticOutfitCosmeticSettingsUpdate.js";
import cosmeticOutfitDelete from "./packets/cosmetic/outfit/cosmeticOutfitDelete.js";
import cosmeticOutfitCreate from "./packets/cosmetic/outfit/cosmeticOutfitCreate.js";
import cosmeticOutfitSelect from "./packets/cosmetic/outfit/cosmeticOutfitSelect.js";
import cosmeticOutfitNameUpdate from "./packets/cosmetic/outfit/cosmeticOutfitNameUpdate.js";
import cosmeticOutfitUpdateFavoriteState from "./packets/cosmetic/outfit/cosmeticOutfitUpdateFavoriteState.js";
import responseActionPacket from "./packets/response/responseActionPacket.js";
import cosmeticOutfitSelectedResponse from "./packets/cosmetic/outfit/cosmeticOutfitSelectedResponse.js";

export type PacketDefinition<Schema extends ZodType<any, any, any>> = {
  className: string;
  body: Schema;
};

export const packetDefinitions: PacketDefinition<ZodObject<any, any, any>>[] = [
  registerPacketTypeId,
  modsAnnounce,
  telemetry,
  responseActionPacket,
  cosmeticsUserUnlocked,
  cosmeticsPopulate,

  cosmeticOutfitPopulate,
  cosmeticOutfitEquippedCosmeticsUpdate,
  cosmeticOutfitCosmeticSettingsUpdate,
  cosmeticOutfitDelete,
  cosmeticOutfitCreate,
  cosmeticOutfitSelect,
  cosmeticOutfitNameUpdate,
  cosmeticOutfitUpdateFavoriteState,
  cosmeticOutfitSelectedResponse
];
