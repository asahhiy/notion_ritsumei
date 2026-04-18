import { Client } from "@notionhq/client";

export default function getNotionClient() {
  const notionApiKey =
    process.env.EXPO_PUBLIC_NOTION_API_KEY ?? process.env.NOTION_API_KEY;
  if (!notionApiKey) {
    throw new Error(
      "Notion API key is not set. Define EXPO_PUBLIC_NOTION_API_KEY (or NOTION_API_KEY).",
    );
  }

  return new Client({
    auth: notionApiKey,
    notionVersion: "2026-03-11",
  });
}
