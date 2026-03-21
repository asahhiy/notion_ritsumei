import { Text, View } from "react-native"


export default function TodayTaskCard() {
  return (
    <View className="h-[100px] w-full bg-yellow-100 rounded-md items-center justify-center">
      <Text className="font-bold text-2xl">
        本日のタスクをFlashListで表示する予定
      </Text>
    </View>
  )
}
