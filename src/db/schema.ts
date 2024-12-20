import {
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").notNull().primaryKey(),
    username: varchar({ length: 17 }).notNull(),
  },
  (user) => ({
    uuidIdx: index("users_id_idx").on(user.id),
    usernameIdx: index("users_username_idx").on(user.username),
  })
);

export const outfits = pgTable(
  "outfits",
  {
    id: uuid().notNull().primaryKey().defaultRandom(),
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id),
    name: text().notNull(),
    skinTexture: text("skin_texture"),
    equippedCosmetics: jsonb("equipped_cosmetics"),
    cosmeticSettings: jsonb("cosmetic_settings"),
    selected: boolean().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    favoritedAt: timestamp("favorited_at"),
    skinId: text("skin_id"),
  },
  (outfit) => ({
    idIdx: index("outfits_id_idx").on(outfit.id),
    ownerIdIdx: index("outfits_owner_id_idx").on(outfit.ownerId),
    selectedIdx: index("outfits_selected_idx").on(outfit.selected),
  })
);

export const emoteWheels = pgTable(
  "emote_wheels",
  {
    id: uuid().notNull().primaryKey().defaultRandom(),
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id),
    selected: boolean().notNull(),
    slots: jsonb().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
  },
  (emoteWheel) => ({
    idIdx: index("emote_wheels_id_idx").on(emoteWheel.id),
    ownerIdIdx: index("emote_wheels_owner_id_idx").on(emoteWheel.ownerId),
    selectedIdx: index("emote_wheels_selected_idx").on(emoteWheel.selected),
  })
);
