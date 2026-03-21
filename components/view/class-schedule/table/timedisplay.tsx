import { Text, View } from "react-native"
import { FlashList } from "@shopify/flash-list"

const data = [
  {
    time: "1"
  },
  {
    time: "2"
  },
  {
    time: "3"
  },
  {
    time: "4"
  }, {
    time: "5"
  }, {
    time: "6"
  },
]

export default function TimeDisplay() {
  return (
    <View className="flex-col self-start">
      {data.map((item) => (
        <View key={item.time}
          className="h-[60px] w-[50px] mb-1">
          <View key={item.time}
            className="bg-indigo-300
            h-[60px] w-[50px] mx-1
          rounded-md 
          items-center 
          justify-center ">
            <Text>{item.time}</Text>
          </View>
        </View>

      ))}
    </View>
  )
}
