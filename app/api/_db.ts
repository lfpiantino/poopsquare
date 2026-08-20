import { env } from "cloudflare:workers";

export async function readyDb() {
  const db = env.DB;
  if (!db) throw new Error("Banco de dados indisponível");
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE, name TEXT NOT NULL, handle TEXT NOT NULL UNIQUE, bio TEXT NOT NULL DEFAULT '', city TEXT NOT NULL DEFAULT '', xp INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, category TEXT NOT NULL, address TEXT NOT NULL, city TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL, access TEXT NOT NULL DEFAULT 'Gratuito', hours TEXT NOT NULL DEFAULT 'Não informado', accessible INTEGER NOT NULL DEFAULT 0, family INTEGER NOT NULL DEFAULT 0, changing_table INTEGER NOT NULL DEFAULT 0, shower INTEGER NOT NULL DEFAULT 0, gender_neutral INTEGER NOT NULL DEFAULT 0, wifi INTEGER NOT NULL DEFAULT 0, notes TEXT NOT NULL DEFAULT '', created_by TEXT NOT NULL, created_at TEXT NOT NULL)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS reviews (id INTEGER PRIMARY KEY AUTOINCREMENT, place_id INTEGER NOT NULL, user_email TEXT NOT NULL, user_name TEXT NOT NULL, rating REAL NOT NULL, cleanliness INTEGER NOT NULL, privacy INTEGER NOT NULL, supplies INTEGER NOT NULL, accessibility INTEGER NOT NULL, comfort INTEGER NOT NULL, comment TEXT NOT NULL, created_at TEXT NOT NULL)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS checkins (id INTEGER PRIMARY KEY AUTOINCREMENT, place_id INTEGER NOT NULL, user_email TEXT NOT NULL, user_name TEXT NOT NULL, created_at TEXT NOT NULL)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS friendships (id INTEGER PRIMARY KEY AUTOINCREMENT, requester TEXT NOT NULL, addressee TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending', created_at TEXT NOT NULL)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS places_geo_idx ON places(latitude, longitude)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS reviews_place_idx ON reviews(place_id)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS checkins_place_idx ON checkins(place_id)`),
  ]);
  return db;
}

export function json(data: unknown, status = 200) { return Response.json(data, { status, headers: { "Cache-Control": "no-store" } }); }
