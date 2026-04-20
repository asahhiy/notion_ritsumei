import { taskProps } from "@/src/models/types/type";
import { Text, View, } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export function TaskItem(taskProps: taskProps) {


  if (taskProps.Status === "完了") {
    //終わったやつ
    return (
      <View className="mx-4 my-1">
        <View className="bg-gray-100 rounded-md p-4 shadow-sm">
          <Text className="text-lg font-inter-bold line-through text-zinc-500">{taskProps.TaskName}</Text>

          <View className="flex flex-row justify-between">

            {taskProps.re_Subject_name !== "" ? (

              <View className="bg-zinc-200 self-start px-2 py-0.5 mt-1 mb-2 ml-2 rounded-md w-auto">
                <Text className="text-zinc-700 text-[11px] font-medium leading-4">
                  {taskProps.re_Subject_name}
                </Text>

              </View>
            ) : (
              <View />
            )}


            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={20} color="black" />

              <Text className="ml-1">
                {taskProps.Due}
              </Text>
            </View>
          </View>
        </View>
      </View>

    )
  } else if (taskProps.Due !== "完了" && taskProps.IsDue === "Passed") {
    //期限すぎてて終わってないやつ
    return (
      <View className="mx-4 my-1 flex flex-row shadow-sm
        border-primary rounded-r-lg">
        <View
          className="bg-red-400 w-[3px]"
        />

        <View className="bg-white p-4 flex-1 overflow-hidden rounded-r-lg">
          <Text className="text-lg font-inter-bold">{taskProps.TaskName}</Text>

          <View className="flex flex-row justify-between flex-shrink">

            {taskProps.re_Subject_name !== "" ? (

              <View className="bg-zinc-200 self-start px-2 py-0.5 mt-1 mb-2 ml-2 rounded-md w-auto">
                <Text className="text-zinc-700 text-[11px] font-medium leading-4">
                  {taskProps.re_Subject_name}
                </Text>

              </View>
            ) : (
              <View />
            )}


            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={20} color="red" />

              <Text className="ml-1 text-red-400">
                {taskProps.Due}
              </Text>
            </View>
          </View>
        </View>
      </View>

    )
  } else {
    //通常の見た目（期限超過も完了もしてないやつ）
    return (
      <View className="mx-4 my-1">
        <View className="bg-white rounded-md p-4 shadow-sm">
          <Text className="text-lg font-inter-bold">{taskProps.TaskName}</Text>

          <View className="flex flex-row justify-between">

            {taskProps.re_Subject_name !== "" ? (

              <View className="bg-zinc-200 self-start px-2 py-0.5 mt-1 mb-2 ml-2 rounded-md w-auto">
                <Text className="text-zinc-700 text-[11px] font-medium leading-4">
                  {taskProps.re_Subject_name}
                </Text>

              </View>
            ) : (
              <View />
            )}


            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={20} color="black" />

              <Text className="ml-1">
                {taskProps.Due}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
