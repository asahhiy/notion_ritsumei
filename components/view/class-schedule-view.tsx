import { Text, View, StyleSheet } from "react-native"
import ClassTable from "./class-schedule/class-table"


export default function ClassScheduleView() {
  return (
    <View style={styles.item}>
      <Text>
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
