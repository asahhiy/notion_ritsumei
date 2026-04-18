import { LessonDataMasterProps } from "@/src/models/types/type";
import { updateLessonData } from "@/src/services/notion/updatelessondata";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

export default function ClassMasterTable({
  data,
  pageId,
}: {
  data: LessonDataMasterProps[];
  pageId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleAddSubject = async (item: LessonDataMasterProps) => {
    setIsLoading(true);
    try {
      await updateLessonData({
        pageId: pageId,
        subjectName: item.fullName,
        semester: "2年前期", //仮
        when: item.period,
        day: item.day,
        place: item.room,
        professor: item.instructor,
        syllabusUrl: item.syllabusUrl,
      });

      Alert.alert("追加完了", "科目が時間割に追加されました。");
    } catch (error) {
      console.error("科目の追加に失敗しました。", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="flex-1">
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <Pressable
            className="p-4 border-b border-gray-300"
            onPress={() => {
              Alert.alert("科目情報追加", "この科目を時間割に追加しますか？", [
                {
                  text: "キャンセル",
                  style: "cancel",
                },
                {
                  text: "追加",
                  style: "default",
                  onPress: () => {
                    // 追加ロジック
                    handleAddSubject(item);
                  },
                },
              ]);
            }}
          >
            <Text className="text-lg font-bold">{item.fullName}</Text>
            <Text>{item.instructor}</Text>
            <Text>{item.room}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
