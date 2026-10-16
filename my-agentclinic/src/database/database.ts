import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { initializeSchema } from "./schema";

export function openDatabase(
  databasePath = resolve(process.cwd(), "data", "agentclinic.db"),
): Database.Database {
  if (databasePath !== ":memory:") {
    mkdirSync(dirname(databasePath), { recursive: true });
  }

  const database = new Database(databasePath);
  database.pragma("foreign_keys = ON");
  initializeSchema(database);
  return database;
}
