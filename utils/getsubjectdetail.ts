import { SubjectData } from "@/types/type";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.EXPO_PUBLIC_NOTION_API_KEY,
  notionVersion: "2026-03-11",
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

  console.log(
    "これからタスクDBを取得します。タスクDBのブロックID:",
    taskDbBlock.id,
  );

  const response = await notion.databases.retrieve({
    database_id: taskDbBlock.id,
  });
  const datasourceId = (response as any).data_sources?.[0].id;
  if (
    (response as any).data_sources &&
    (response as any).data_sources.length > 0
  ) {
    console.log("データソースID:取得成功");
  } else {
    console.log("データソースIDが見つかりませんでした。");
  }

  //3 タスクDBからタスクを取得

  const tasksResponse = await notion.dataSources.query({
    data_source_id: datasourceId,
  });
  console.log("taskResponse:", JSON.stringify(tasksResponse, null, 2));
  return tasksResponse.results;
}
