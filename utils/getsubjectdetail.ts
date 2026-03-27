import { SubjectData, TaskDetail } from "@/types/type";
import getNotionClient from "./auth/getNotionClient";

export async function getSubjectDetail(
  subjectData: SubjectData,
): Promise<TaskDetail[]> {
  const notion = getNotionClient();
  const { subjectName, day, when } = subjectData;

  const timetableResponse = await notion.dataSources.query({
    data_source_id: "32a9f424-ebfa-804a-8e49-000b44cfa084",
    filter: {
      and: [
        {
          property: "When",
          select: {
            equals: when,
          },
        },
        {
          property: "Day",
          select: {
            equals: day,
          },
        },
        {
          property: "Semester",
          select: {
            equals: "2年前期",
          },
        },
      ],
    },
  });

  if (timetableResponse.results.length === 0) {
    console.log("No matching subject found for", subjectData);
    return [];
  }

  const classPageId = timetableResponse.results[0].id;
  console.log("クラスページID:", classPageId);

  const taskResponse = await notion.dataSources.query({
    data_source_id: "32d9f424-ebfa-805a-8302-000bb3b1141a",
    filter: {
      property: "Re_SubjectName",
      relation: {
        contains: classPageId,
      },
    },
  });

  // console.log("タスクのクエリ結果:", JSON.stringify(taskResponse, null, 2));

  const extractedTasks = taskResponse.results.map((page: any) => {
    const properties = page.properties;

    const taskName =
      properties["TaskName"]?.title?.[0]?.plain_text || "名称未設定";

    const status = properties["Status"]?.status?.name || "未着手";

    const due = properties["Due"]?.date?.start || "期限未設定";

    const isDue = properties["IsDue"]?.formula?.string || "NotDefined";

    return {
      TaskName: taskName,
      Status: status,
      Due: due,
      IsDue: isDue,
    };
  });

  console.log("抽出されたタスク:", JSON.stringify(extractedTasks, null, 2));
  if (extractedTasks.length === 0) {
    console.log("No tasks found for subject:", subjectData);
    return [];
  }

  return extractedTasks;
}
