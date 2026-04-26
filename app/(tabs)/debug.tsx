import ClassNumberPicker from "@/src/views/components/debug/class-number-picker";
import { seedDatabase } from "@/src/services/db/seed";
import { getSubjectList } from "@/src/services/sqlite/getsubjectlist";
import { updateLessonData } from "@/src/services/notion/updatelessondata";
import { Button, ScrollView, Text, View } from "react-native";
import { ThemedView } from "@/src/views/components/themed-view";

export default function DebugScreen() {
  return (
    <ThemedView className="flex-1">
      <ScrollView>
        <View style={{ height: 40 }} />
        <Text>Debug Screen</Text>
        <ClassNumberPicker />

        <Button
          title="SQLiteいじっちゃう//"
          onPress={async () =>
            await getSubjectList({
              day: "monday",
              period: 1,
              term: "spring",
            })
          }
        />
        <Button
          title="Execute Seeding"
          onPress={async () => await seedDatabase()}
        />
        <View className="h-[100px]" />
        <Button
          title="試しに更新"
          onPress={async () => {
            await updateLessonData({
              pageId: "32d9f424ebfa80e89be6f3af270fcf44",
              subjectName: "更新テストseikou",
              semester: "2年前期",
              when: 1,
              day: "tuesday",
              place: "オンライン",
              professor: "山田太郎",
              syllabusUrl: "https://example.com/syllabus",
            });
          }}
        />
      </ScrollView>
    </ThemedView>
  );
}