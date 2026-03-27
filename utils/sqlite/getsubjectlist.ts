import { lessons } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "../seed";

export async function getSubjectList() {
  const result = await db
    .select()
    .from(lessons)
    .where(eq(lessons.day, "monday"));

  console.log(result);

  return result;
}
