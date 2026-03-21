import { Text, View, StyleSheet } from "react-native"
import ClassTable from "./class-schedule/class-table"


export default function ClassScheduleView() {
  return (
    <View style={styles.item}>
      <Text className="font-bold text-2xl border-r-3 bg-yellow-400">
        this is class schedule view prefab
      </Text>
      <ClassTable />
    </View>
  )
}



const styles = StyleSheet.create({
  item: {
    height: 500,
    padding: 18,
  }
})
