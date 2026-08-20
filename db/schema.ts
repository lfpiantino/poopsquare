import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }), email: text("email").notNull().unique(),
  name: text("name").notNull(), handle: text("handle").notNull().unique(), bio: text("bio").notNull().default(""),
  city: text("city").notNull().default(""), xp: integer("xp").notNull().default(0), createdAt: text("created_at").notNull(),
});
export const places = sqliteTable("places", {
  id: integer("id").primaryKey({ autoIncrement: true }), name: text("name").notNull(), category: text("category").notNull(),
  address: text("address").notNull(), city: text("city").notNull(), latitude: real("latitude").notNull(), longitude: real("longitude").notNull(),
  access: text("access").notNull().default("Gratuito"), hours: text("hours").notNull().default("Não informado"),
  accessible: integer("accessible", { mode: "boolean" }).notNull().default(false), family: integer("family", { mode: "boolean" }).notNull().default(false),
  changingTable: integer("changing_table", { mode: "boolean" }).notNull().default(false), shower: integer("shower", { mode: "boolean" }).notNull().default(false),
  genderNeutral: integer("gender_neutral", { mode: "boolean" }).notNull().default(false), wifi: integer("wifi", { mode: "boolean" }).notNull().default(false),
  notes: text("notes").notNull().default(""), createdBy: text("created_by").notNull(), createdAt: text("created_at").notNull(),
});
export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }), placeId: integer("place_id").notNull(), userEmail: text("user_email").notNull(), userName: text("user_name").notNull(),
  rating: real("rating").notNull(), cleanliness: integer("cleanliness").notNull(), privacy: integer("privacy").notNull(), supplies: integer("supplies").notNull(),
  accessibility: integer("accessibility").notNull(), comfort: integer("comfort").notNull(), comment: text("comment").notNull(), createdAt: text("created_at").notNull(),
});
export const checkins = sqliteTable("checkins", { id: integer("id").primaryKey({ autoIncrement: true }), placeId: integer("place_id").notNull(), userEmail: text("user_email").notNull(), userName: text("user_name").notNull(), createdAt: text("created_at").notNull() });
export const friendships = sqliteTable("friendships", { id: integer("id").primaryKey({ autoIncrement: true }), requester: text("requester").notNull(), addressee: text("addressee").notNull(), status: text("status").notNull().default("pending"), createdAt: text("created_at").notNull() });
