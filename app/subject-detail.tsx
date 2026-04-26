import { SubjectData } from "@/src/models/types/type";
import TaskList from "@/src/views/components/view/tasklist/task-list";
import UpdateLessonButton from "@/src/views/components/view/update-lesson";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

export default function SubjectDetailScreen() {
  const router = useRouter();
  const { pageId, subjectName, day, when, place } =
    useLocalSearchParams() as SubjectData;
  const subjectData: SubjectData = {
    pageId,
    subjectName,
    day,
    when,
    place,
  };

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: subjectData.subjectName }} />
      <UpdateLessonButton
        subjectData={subjectData}
        onPress={() => {
          router.push({
            pathname: "/editsubjectdetail",
            params: {
              pageId: subjectData.pageId,
              subjectName: subjectData.subjectName,
              day: subjectData.day,
              when: subjectData.when,
            },
          });
        }}
      />
      <TaskList subjectData={subjectData} />
    </View>
  );
}
