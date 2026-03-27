import { SubjectData } from "@/types/type";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EditSubjectDetailScreen() {
  const {
    pageId: paramPageId,
    subjectName: paramSubjectName,
    day: paramDay,
    when: paramWhen,
  } = useLocalSearchParams() as SubjectData;

  return (
    <View>
      <Text>Edit Subject Detail Screen</Text>
      <Text>Page ID: {paramPageId}</Text>
      <Text>Subject Name: {paramSubjectName}</Text>
      <Text>Day: {paramDay}</Text>
      <Text>When: {paramWhen}</Text>
    </View>
  );
}
