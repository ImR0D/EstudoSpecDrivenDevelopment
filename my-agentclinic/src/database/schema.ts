import type Database from "better-sqlite3";

export function initializeSchema(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS agents (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL CHECK (length(trim(name)) > 0),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS ailments (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL CHECK (length(trim(name)) > 0),
      description TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS therapies (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL CHECK (length(trim(name)) > 0),
      description TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS agent_ailments (
      agent_id INTEGER NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
      ailment_id INTEGER NOT NULL REFERENCES ailments(id) ON DELETE CASCADE,
      PRIMARY KEY (agent_id, ailment_id)
    );

    CREATE TABLE IF NOT EXISTS ailment_therapies (
      ailment_id INTEGER NOT NULL REFERENCES ailments(id) ON DELETE CASCADE,
      therapy_id INTEGER NOT NULL REFERENCES therapies(id) ON DELETE CASCADE,
      PRIMARY KEY (ailment_id, therapy_id)
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY,
      agent_id INTEGER NOT NULL REFERENCES agents(id) ON DELETE RESTRICT,
      therapy_id INTEGER REFERENCES therapies(id) ON DELETE RESTRICT,
      scheduled_at TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'scheduled'
        CHECK (status IN ('scheduled', 'completed', 'cancelled')),
      notes TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
