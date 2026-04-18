import { allSubjectData_2026_spring } from "@/data/allsubejctdata_2026_spring";
import { lessons } from "@/src/services/db/schema"; //schemaファイル
import { migrateDatabase } from "@/src/services/db/migrate";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

const expoDB = SQLite.openDatabaseSync("my_database.db");
export const db = drizzle(expoDB);

export async function seedDatabase() {
  try {
    await migrateDatabase();

    const existing = await db.select().from(lessons).limit(1);
    if (existing.length === 0) {
      console.log("インポートなう!!!!");

      const normalizedLessons = allSubjectData_2026_spring.map((subject) => ({
        id: subject.id,
        fullName: subject.full_name,
        instructor: subject.instructor,
        room: subject.room,
        syllabusUrl: subject.syllabus_url,
        term: subject.semester,
        day: subject.day,
        period: subject.period,
      }));

      //JSONを注入
      await db.insert(lessons).values(normalizedLessons);
      console.log("インポート完了!!!!");
    } else {
      console.log("すでにデータがあるからインポートはスキップするわ。");
    }
  } catch (error) {
    console.error("シード処理に失敗してもうたわ。すまん。", error);
  }
}
