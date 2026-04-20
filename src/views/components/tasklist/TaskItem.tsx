import { taskProps } from "@/src/models/types/type";
import { Text, View, } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export function TaskItem(taskProps: taskProps) {


  if (taskProps.Status === "完了") {
    return (
      <View className="mx-4 my-1">
        <View className="bg-secondary/5 border-primary border rounded-md p-4">
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
    return (
      <View className="mx-4 my-1 flex flex-row border-primary border rounded-r-md overflow-hidden">
        <View
          className="bg-red-600 w-[6px]"
        />

        <View className="bg-white p-4 flex-1">
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
  } else {

    return (
      <View className="mx-4 my-1">
        <View className="bg-white border-primary border rounded-md p-4">
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
