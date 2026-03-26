import { View } from "react-native";
import ClassTable from "./class-schedule/class-table";

export default function ClassScheduleView() {
  return (
    <View className="h-[800px] p-1 justify-start">
      <ClassTable />
    </View>
  );
}
