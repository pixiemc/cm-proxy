import { ZodObject, ZodType } from "zod";
import registerPacketTypeId from "./packets/connection/registerPacketTypeId.js";
import clientCosmeticAnimationTrigger from "./packets/cosmetic/clientCosmeticAnimationTrigger.js";
import cosmeticsPopulate from "./packets/cosmetic/cosmeticsPopulate.js";
import cosmeticsUserUnlocked from "./packets/cosmetic/cosmeticsUserUnlocked.js";
import cosmeticEmoteWheelPopulate from "./packets/cosmetic/emote/cosmeticEmoteWheelPopulate.js";
import cosmeticOutfitCosmeticSettingsUpdate from "./packets/cosmetic/outfit/cosmeticOutfitCosmeticSettingsUpdate.js";
import cosmeticOutfitCreate from "./packets/cosmetic/outfit/cosmeticOutfitCreate.js";
import cosmeticOutfitDelete from "./packets/cosmetic/outfit/cosmeticOutfitDelete.js";
import cosmeticOutfitEquippedCosmeticsUpdate from "./packets/cosmetic/outfit/cosmeticOutfitEquippedCosmeticsUpdate.js";
import cosmeticOutfitNameUpdate from "./packets/cosmetic/outfit/cosmeticOutfitNameUpdate.js";
import cosmeticOutfitPopulate from "./packets/cosmetic/outfit/cosmeticOutfitPopulate.js";
import cosmeticOutfitSelect from "./packets/cosmetic/outfit/cosmeticOutfitSelect.js";
import cosmeticOutfitSelectedResponse from "./packets/cosmetic/outfit/cosmeticOutfitSelectedResponse.js";
import cosmeticOutfitUpdateFavoriteState from "./packets/cosmetic/outfit/cosmeticOutfitUpdateFavoriteState.js";
import serverCosmeticAnimationTrigger from "./packets/cosmetic/serverCosmeticAnimationTrigger.js";
import modsAnnounce from "./packets/mod/modsAnnounce.js";
import responseActionPacket from "./packets/response/responseActionPacket.js";
import subscriptionUpdatePacket from "./packets/subscription/subscriptionUpdatePacket.js";
import telemetry from "./packets/telemetry/telemetry.js";
import cosmeticEmoteWheelUpdate from "./packets/cosmetic/emote/cosmeticEmoteWheelUpdate.js";

export type PacketDefinition<Schema extends ZodType<any, any, any>> = {
  className: string;
  body: Schema;
};

export const packetDefinitions: PacketDefinition<ZodObject<any, any, any>>[] = [
  registerPacketTypeId,
  modsAnnounce,
  telemetry,
  subscriptionUpdatePacket,
  responseActionPacket,

  cosmeticsUserUnlocked,
  cosmeticsPopulate,
  serverCosmeticAnimationTrigger,
  clientCosmeticAnimationTrigger,
  cosmeticOutfitPopulate,
  cosmeticOutfitEquippedCosmeticsUpdate,
  cosmeticOutfitCosmeticSettingsUpdate,
  cosmeticOutfitDelete,
  cosmeticOutfitCreate,
  cosmeticOutfitSelect,
  cosmeticOutfitNameUpdate,
  cosmeticOutfitUpdateFavoriteState,
  cosmeticOutfitSelectedResponse,
  cosmeticEmoteWheelPopulate,
  cosmeticEmoteWheelUpdate
];
