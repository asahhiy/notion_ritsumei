import { Text, View, Button } from "react-native"
import ClassTable from "./class-schedule/class-table"
import getSubjectList from "@/utils/getsubjectlist"


export default function ClassScheduleView() {
  return (
    <View className="h-[550px] p-[18px] justify-start">
      <ClassTable />
    </View>
  )
}



