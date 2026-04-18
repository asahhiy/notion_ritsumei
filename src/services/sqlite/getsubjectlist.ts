import { lessons } from "@/src/services/db/schema";
import { LessonQueryProps } from "@/src/models/types/type";
import { and, eq } from "drizzle-orm";
import { db } from "@/src/services/db/seed";

export async function getSubjectList(query: LessonQueryProps) {
  const result = await db
    .select()
    .from(lessons)
    .where(
      and(
        eq(lessons.day, query.day),
        eq(lessons.period, query.period),
        eq(lessons.term, query.term),
      ),
    );

  console.log(JSON.stringify(result, null, 2));

  return result;
}
