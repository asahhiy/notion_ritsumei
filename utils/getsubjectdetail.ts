import { SubjectData } from "@/types/type";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.EXPO_PUBLIC_NOTION_API_KEY,
});

export async function getSubjectDetail(subjectData: SubjectData) {
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
      ],
    },
  });

  if (timetableResponse.results.length === 0) {
    console.log("No matching subject found for", subjectData);
    return;
  }

  const classPageId = timetableResponse.results[0].id;

  //2 ここで得られたページIDから子DBを取得
  const blocksResponse = await notion.blocks.children.list({
    block_id: classPageId,
  });

  //3 子DBの中から「タスクDB」という名前のデータベースを探す
  const taskDbBlock = blocksResponse.results.find(
    (block: any) =>
      block.type === "child_database" &&
      block.child_database.title === "タスクDB",
  );

  if (!taskDbBlock) {
    console.log("No task database found for subject:", subjectName);
    return;
  }

  const taskDbId = taskDbBlock.id;
  const databaseInfo = await notion.databases.retrieve({
    database_id: taskDbId,
  });

  const dataSourceId = databaseInfo.id;
  console.log("Data Source ID:", dataSourceId);

  //3 タスクDBからタスクを取得
  const tasksResponse = await notion.dataSources.query({
    data_source_id: "32c9f424-ebfa-809d-8454-000bb4078c2b",
  });
  console.log("taskResponseID:", tasksResponse);

  return tasksResponse.results;
}
