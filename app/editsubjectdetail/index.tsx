import ClassMasterTable from "@/components/view/classmaster/classmastertable";
import { LessonDataMasterProps, SubjectData } from "@/types/type";
import { getSubjectList } from "@/utils/sqlite/getsubjectlist";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function EditSubjectDetailScreen() {
  const {
    pageId: paramPageId,
    subjectName: paramSubjectName,
    day: paramDay,
    when: paramWhen,
  } = useLocalSearchParams() as SubjectData;

  const [subjectDatas, setSubjectDatas] = useState<LessonDataMasterProps[]>([]);

  useEffect(() => {
    const fetchSubjectList = async () => {
      const result = await getSubjectList({
        day: paramDay,
        period: Number(paramWhen),
        term: "spring", //仮
      });

      const normalizedResult: LessonDataMasterProps[] = result.map((item) => ({
        ...item,
        instructor: item.instructor ?? "",
        room: item.room ?? "",
        syllabusUrl: item.syllabusUrl ?? "",
        term: item.term ?? "",
        day: item.day ?? "",
        period: item.period ?? 0,
      }));

      setSubjectDatas(normalizedResult);
    };

    void fetchSubjectList();
  }, [paramDay, paramWhen]);

  return (
    <View className="flex-1">
      <Text>Edit Subject Detail Screen</Text>
      <Text>Page ID: {paramPageId}</Text>
      <Text>Subject Name: {paramSubjectName}</Text>
      <Text>Day: {paramDay}</Text>
      <Text>When: {paramWhen}</Text>
      <Text>Fetched Subjects: {subjectDatas.length}</Text>
      {subjectDatas.length > 0 && paramPageId ? (
        <ClassMasterTable data={subjectDatas} pageId={paramPageId} />
      ) : (
        <Text>No subjects found.</Text>
      )}
    </View>
  );
}
