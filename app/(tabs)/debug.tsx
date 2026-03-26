import ClassNumberPicker from "@/components/debug/class-number-picker";
import { ScrollView, Text, View } from "react-native";

export default function DebugScreen() {
  return (
    <ScrollView>
      <View style={{ height: 40 }} />
      <Text>Debug Screen</Text>
      <ClassNumberPicker />
      <View className="h-[500px]" />
    </ScrollView>
  );
}
