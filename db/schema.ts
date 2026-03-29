import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const lessons = sqliteTable("lessons", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  instructor: text("instructor"),
  room: text("room"),
  syllabusUrl: text("syllabus_url"),
  term: text("term"), //semesterと同義。定義ミスったわ
  day: text("day"),
  period: integer("period"), //1,2,3,4,5,6
});
