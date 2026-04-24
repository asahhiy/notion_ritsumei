import { taskProps } from "@/src/models/types/type";
import { useTaskItem } from "@/src/viewmodels/hooks/useTaskItem";
import { Ionicons } from '@expo/vector-icons';
import { Text, View, } from "react-native";


export function TaskItem(taskProps: taskProps) {
  const {
    cardOuterClassName,
    cardInnerClassName,
    titleClassName,
    dateTextClassName,
    dateIconColor,
    accentClassName,
  } = useTaskItem(taskProps)

  return (
    <View className={cardOuterClassName}>
      {accentClassName !== "" ? <View className={accentClassName} /> : null}

      <View className={cardInnerClassName}>
        <Text className={titleClassName}>{taskProps.TaskName}</Text>

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
            <Ionicons name="calendar-outline" size={20} color={dateIconColor} />

            <Text className={dateTextClassName}>
              {taskProps.Due}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
