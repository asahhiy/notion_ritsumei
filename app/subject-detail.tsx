import TaskList from "@/components/view/tasklist/task-list";
import { SubjectData } from "@/types/type";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function SubjectDetailScreen() {
  const { subjectName, day, when } = useLocalSearchParams() as SubjectData;
  const SubjectData: SubjectData = {
    subjectName,
    day,
    when,
  };

  return (
    <View className="flex-1">
      <TaskList SubjectData={SubjectData} />
    </View>
  );
}
