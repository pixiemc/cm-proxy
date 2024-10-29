import {
  bigint,
  boolean,
  index,
  integer,
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

export const outfits = pgTable("outfits", {
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
  favoritedAt: bigint("favorited_at", { mode: "number" }),
  skinId: text("skin_id"),
});
