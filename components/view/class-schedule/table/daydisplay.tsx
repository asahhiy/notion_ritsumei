import { Text, View, StyleSheet } from "react-native"
import { FlashList } from "@shopify/flash-list"

const data = [
  {
    title: ""
  },
  {
    title: "月"
  },
  {
    title: "火"
  },
  {
    title: "水"
  }, {
    title: "木"
  }, {
    title: "金"
  },
]


export default function DayDisplay() {
  return (
    <View className="flex-row">
      {data.map((item) => (
        <View key={item.title} className="bg-indigo-300 rounded-md mx-1 items-center justify-center h-[40px] w-[50px]">
          <Text>{item.title}</Text>
        </View>
      ))}
    </View>
  )
}
