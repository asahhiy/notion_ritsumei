import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, View } from "react-native";

export default function UpdateLessonButton() {
  return (
    <View>
      <View className="flex-row justify-end p-2">
        <Pressable onPress={() => console.log("Pencil pressed!")}>
          <Link href="/editsubjectdetail">
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
