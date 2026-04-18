import { SubjectData, dayOrder } from "@/src/models/types/type";
import getNotionClient from "@/src/services/auth/getNotionClient";

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
      // titleは配列なので、mapを使って各要素の plain_text を抽出し、join("") で結合
      subjectName = subjectProp.title.map((t) => t.plain_text).join("") || ""; //枠を維持するためスペースを入れる
    } else if (subjectProp.type === "rich_text") {
      // rich_text型の場合も同様に配列として処理
      subjectName =
        subjectProp.rich_text.map((t) => t.plain_text).join("") || "";
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

    const placeProp = page.properties.Place;
    let place = "未設定";
    if (placeProp.type === "select") {
      place = placeProp.select?.name || "未設定";
    }

    formattedResults.push({
      pageId: page.id,
      subjectName,
      when,
      day,
      place,
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
  console.log(JSON.stringify(sortedResults, null, 2));

  return sortedResults;
}
