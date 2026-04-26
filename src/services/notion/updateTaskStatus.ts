import getNotionClient from "@/src/services/auth/getNotionClient";

export async function updateTaskStatus(pageId: string, statusName: string) {
  const notion = await getNotionClient();

  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        Status: {
          status: {
            name: statusName,
          },
        },
      },
    });
    console.log("Status(status型) updated successfully"); 
    return;
  } catch (statusError) {
    console.error("Status(status型) update failed", statusError);
    throw statusError;
  }
}
