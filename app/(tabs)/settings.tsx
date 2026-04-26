import { Text, View } from "react-native";
import { ThemedView } from "@/src/views/components/themed-view";

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1">
      <View style={{ height: 40 }} />
      <Text>please subscribe our apps</Text>
    </ThemedView>
  );
}