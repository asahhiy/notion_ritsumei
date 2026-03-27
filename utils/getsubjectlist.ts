import { Client } from "@notionhq/client";
import { SubjectData, dayOrder } from "../types/type";

function getNotionClient() {
  const notionApiKey =
    process.env.EXPO_PUBLIC_NOTION_API_KEY ?? process.env.NOTION_API_KEY;
  if (!notionApiKey) {
    throw new Error(
      "Notion API key is not set. Define EXPO_PUBLIC_NOTION_API_KEY (or NOTION_API_KEY).",
    );
  }

  return new Client({ auth: notionApiKey });
}

export default async function getSubjectList() {
  const notion = getNotionClient();
  const response = await notion.dataSources.query({
    data_source_id: "32a9f424-ebfa-804a-8e49-000b44cfa084",
    filter: {
      and: [
        {
          property: "Semester",
          select: {
            equals: "2年前期",
          },
        },
      ],
    },
  });

  const formattedResults: SubjectData[] = [];

  let sortedResults: SubjectData[] = [];
  response.results.forEach((page) => {
    if (!("properties" in page) || page.object !== "page") {
      return;
    }
    const subjectProp = page.properties.SubjectName;
    let subjectName = "";
    // 2. 型ガード: プロパティが「title」型であるかをチェック
    if (subjectProp.type === "title") {
      // titleは配列なので、mapを使って各要素の plain_text を抽出し、join("") で結合します
      subjectName = subjectProp.title.map((t) => t.plain_text).join("") || "";
    } else if (subjectProp.type === "rich_text") {
      // rich_text型の場合も同様に配列として処理
      subjectName =
        subjectProp.rich_text.map((t) => t.plain_text).join("") || "未設定";
    }
    // --------------------------------------------------
    // When や Day (select型) の処理はそのまま（単一オブジェクトなので配列処理は不要）
    // --------------------------------------------------
    const whenProp = page.properties.When;
    let when = "未設定";
    if (whenProp.type === "select") {
      when = whenProp.select?.name || "未設定";
    }

    const dayProp = page.properties.Day;
    let day = "未設定";
    if (dayProp.type === "select") {
      day = dayProp.select?.name || "未設定";
    }

    formattedResults.push({
      subjectName,
      when,
      day,
    });
  });

  sortedResults = formattedResults.sort((a, b) => {
    const whenDiff = Number(a.when) - Number(b.when);
    if (whenDiff !== 0) {
      return whenDiff;
    }

    const dayRankA = dayOrder[a.day.toLowerCase()] || 999; // 順序が不明な場合は大きな値を設定
    const dayRankB = dayOrder[b.day.toLowerCase()] || 999;
    return dayRankA - dayRankB;
  });
  console.log(sortedResults);

  return sortedResults;
}
