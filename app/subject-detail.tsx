import TaskList from "@/components/view/tasklist/task-list";
import UpdateLessonButton from "@/components/view/update-lesson";
import { SubjectData } from "@/types/type";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Text, View } from "react-native";

export default function SubjectDetailScreen() {
  const navigation = useNavigation();
  const { pageId, subjectName, day, when, place } =
    useLocalSearchParams() as SubjectData;
  const subjectData: SubjectData = {
    pageId,
    subjectName,
    day,
    when,
    place,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: subjectData.subjectName,
    });
  });

  return (
    <View className="flex-1">
      <UpdateLessonButton subjectData={subjectData} />
      <TaskList subjectData={subjectData} />
    </View>
  );
}
