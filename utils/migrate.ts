import * as SQLite from "expo-sqlite";

const expoDB = SQLite.openDatabaseSync("my_database.db");

export async function migrateDatabase() {
  await expoDB.execAsync(`
    CREATE TABLE IF NOT EXISTS lessons (
      id TEXT PRIMARY KEY NOT NULL,
      full_name TEXT NOT NULL,
      instructor TEXT,
      room TEXT,
      syllabus_url TEXT,
      term TEXT,
      day TEXT,
      period INTEGER
    );
  `);
}
