import { SubjectData } from "@/src/models/types/type";
import { SymbolView } from "expo-symbols";
import { Pressable, View } from "react-native";

interface UpdateLessonButtonProps {
  subjectData: SubjectData;
  onPress: () => void;
}

export default function UpdateLessonButton({
  subjectData,
  onPress,
}: UpdateLessonButtonProps) {
  return (
    <View>
      <View className="flex-row justify-end p-2">
        <Pressable onPress={onPress}>
          <SymbolView
            name="pencil.and.ellipsis.rectangle"
            size={36}
            tintColor="#007AFF"
          />
        </Pressable>
      </View>
    </View>
  );
}
