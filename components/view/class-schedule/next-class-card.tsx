import { Text, View } from "react-native"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function NextClassCard() {

  return (
    <View className="h-[100px] w-full bg-yellow-100 rounded-md">
      <Text className="font-semi-bold text-xl m-4">
        次の授業
      </Text>
      <View className="flex-row justify-between">
        <MaterialIcons name="navigate-next" size={48} color="black" />
        <View className="justify-center items-center w-auto ">
          <Text className="flex font-bold text-4xl">  論理回路</Text>
        </View>
        <View className="w-[48px] items-end justify-end flex-row">
          <MaterialIcons name="place" size={24} color="black" />
          <Text className="text-inherit">H301</Text>
        </View>
      </View>

    </View>
  )
}
