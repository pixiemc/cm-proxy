import { z, ZodObject } from "zod";
import { Client } from "~/client.js";
import { Packet } from "~/protocol/index.js";
import { PacketDefinition } from "~/protocol/packets.js";
import u2cRegisterPacketTypeIdHandler from "./u2c/connection/u2cRegisterPacketTypeIdHandler.js";
import c2uRegisterPacketTypeIdHandler from "./c2u/connection/c2uRegisterPacketTypeIdHandler.js";
import c2uTelemetry from "./c2u/telemetry/c2uTelemetryHandler.js";
import c2uModsAnnounceHandler from "./c2u/mod/c2uModsAnnounceHandler.js";
import u2cCosmeticsPopulateHandler from "./u2c/cosmetic/u2cCosmeticsPopulateHandler.js";
import u2cCosmeticsUserUnlockedHandler from "./u2c/cosmetic/u2cCosmeticsUserUnlockedHandler.js";
import u2cCosmeticOutfitPopulate from "./u2c/cosmetic/outfit/u2cCosmeticOutfitPopulate.js";
import c2uCosmeticOutfitEquippedCosmeticsUpdate from "./c2u/comsetic/outfit/c2uCosmeticOutfitEquippedCosmeticsUpdate.js";
import c2uCosmeticOutfitCosmeticSettingsUpdate from "./c2u/comsetic/outfit/c2uCosmeticOutfitCosmeticSettingsUpdate.js";
import c2uCosmeticOutfitDelete from "./c2u/comsetic/outfit/c2uCosmeticOutfitDelete.js";
import c2uCosmeticOutfitCreate from "./c2u/comsetic/outfit/c2uCosmeticOutfitCreate.js";
import c2uCosmeticOutfitSelect from "./c2u/comsetic/outfit/c2uCosmeticOutfitSelect.js";
import c2uCosmeticOutfitNameUpdate from "./c2u/comsetic/outfit/c2uCosmeticOutfitNameUpdate.js";
import c2uCosmeticOutfitUpdateFavoriteState from "./c2u/comsetic/outfit/c2uCosmeticOutfitUpdateFavoriteState.js";
import u2cCosmeticOutfitSelectedResponse from "./u2c/cosmetic/outfit/u2cCosmeticOutfitSelectedResponse.js";
export type Handler<T extends PacketDefinition<any>> = {
  def: T;
  handle: (
    client: Client,
    packet: Packet<z.infer<T["body"]>>
  ) => Promise<Packet<z.infer<T["body"]>> | { cancelled: boolean } | undefined>;
};

export const clientToUpstreamHandlers = [
  c2uRegisterPacketTypeIdHandler,
  c2uModsAnnounceHandler,
  c2uTelemetry,
  c2uCosmeticOutfitEquippedCosmeticsUpdate,
  c2uCosmeticOutfitCosmeticSettingsUpdate,
  c2uCosmeticOutfitDelete,
  c2uCosmeticOutfitCreate,
  c2uCosmeticOutfitSelect,
  c2uCosmeticOutfitNameUpdate,
  c2uCosmeticOutfitUpdateFavoriteState,
];
export const upstreamToClientHandlers = [
  u2cRegisterPacketTypeIdHandler,
  u2cCosmeticsPopulateHandler,
  u2cCosmeticsUserUnlockedHandler,
  u2cCosmeticOutfitPopulate,
  u2cCosmeticOutfitSelectedResponse,
];
