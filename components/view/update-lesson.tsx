import { SubjectData } from "@/types/type";
import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, View } from "react-native";

interface UpdateLessonButtonProps {
  subjectData: SubjectData;
}

export default function UpdateLessonButton({
  subjectData,
}: UpdateLessonButtonProps) {
  return (
    <View>
      <View className="flex-row justify-end p-2">
        <Pressable onPress={() => console.log("Pencil pressed!")}>
          <Link
            href={{
              pathname: "/editsubjectdetail",
              params: {
                pageId: subjectData.pageId,
                subjectName: subjectData.subjectName,
                day: subjectData.day,
                when: subjectData.when,
              },
            }}
          >
            <SymbolView
              name="pencil.and.ellipsis.rectangle"
              size={36}
              tintColor="#007AFF"
            />
          </Link>
        </Pressable>
      </View>
    </View>
  );
}
