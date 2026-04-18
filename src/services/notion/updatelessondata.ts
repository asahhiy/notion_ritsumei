import { UpdateSubjectData } from "@/src/models/types/type";
import getNotionClient from "@/src/services/auth/getNotionClient";

export async function updateLessonData(updateData: UpdateSubjectData) {
  const notion = await getNotionClient();

  notion.pages.update({
    page_id: updateData.pageId,
    properties: {
      SubjectName: {
        title: [
          {
            text: {
              content: updateData.subjectName,
            },
          },
        ],
      },
      When: {
        select: {
          name: updateData.when.toString(),
        },
      },
      Day: {
        select: {
          name: updateData.day,
        },
      },
      Place: {
        select: {
          name: updateData.place,
        },
      },
      Professor: {
        select: {
          name: updateData.professor,
        },
      },
      SyllabusUrl: {
        url: updateData.syllabusUrl,
      },
    },
  });
}
