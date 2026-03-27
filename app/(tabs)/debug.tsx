import ClassNumberPicker from "@/components/debug/class-number-picker";
import { migrateDatabase } from "@/utils/migrate";
import { seedDatabase } from "@/utils/seed";
import { Button, ScrollView, Text, View } from "react-native";

export default function DebugScreen() {
  return (
    <ScrollView>
      <View style={{ height: 40 }} />
      <Text>Debug Screen</Text>
      <ClassNumberPicker />

      <Button
        title="Execute Migration"
        onPress={async () => await migrateDatabase()}
      />
      <Button
        title="Execute Seeding"
        onPress={async () => await seedDatabase()}
      />
      <View className="h-[500px]" />
    </ScrollView>
  );
}
