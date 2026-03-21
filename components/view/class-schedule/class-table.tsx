import { Text, View, StyleSheet } from "react-native"
import DayDisplay from "./table/daydisplay"
import TimeDisplay from "./table/timedisplay"
import SubjectTable from "./table/subject-table"

export default function ClassTable() {
  return (
    <View className="flex-1">
      <Text>
        this is the class table prefab
      </Text>

      <DayDisplay />
      <View className="flex-row mt-1">
        <TimeDisplay />
        <View className="flex-1">
          <SubjectTable />
        </View>
      </View>


    </View>


  )
}


