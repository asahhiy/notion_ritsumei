import { SubjectData } from "@/src/models/types/type";
import { useTaskViewModel } from "@/src/viewmodels/hooks/useTaskViewModel";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { TaskItem } from "../../tasklist/TaskItem";

export default function TaskList({
  subjectData,
}: {
  subjectData: SubjectData;
}) {
  const { tasks, isLoading, isError, refetch, toggleComplete } = useTaskViewModel(subjectData);
  const [isSwipeEnabled, setIsSwipeEnabled] = useState(true)

  //Loading処理とerror処理
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else if (isError) {
    return (
      <View>
        <Text>Error loading data.</Text>
        <Button
          title="Retry"
          onPress={() => {
            refetch();
          }}
        />
      </View>
    );
  }

  if (tasks.length === 0) {
    return (
      <View>
        <Text>現在この科目にはタスクがありません。</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className=" h-[400px] p-1 justify-start">
        <Button
          title="タスクデータ更新"
          onPress={async () => {
            await refetch();
          }}
        />
        {__DEV__ ? (
          <Button
            title={isSwipeEnabled ? "Swipeable: ON" : "Swipeable: OFF"}
            onPress={() => {
              setIsSwipeEnabled((prev) => !prev)
            }}
          />
        ) : null}
        <FlashList
          data={tasks}
          keyExtractor={(item, index) => item.pageId ?? `${item.TaskName}-${index}`}
          renderItem={({ item }) => {
            if (!isSwipeEnabled || !item.pageId) {
              return <TaskItem {...item} />
            }

            return (
              <ReanimatedSwipeable
                friction={2}
                rightThreshold={32}
                renderRightActions={() => (
                  <View className="my-1 mr-4 w-[96px] items-center justify-center rounded-md bg-green-500">
                    <Text className="font-inter-bold text-white">完了</Text>
                  </View>
                )}
                onSwipeableWillOpen={() => {
                  void toggleComplete(item.pageId as string)
                }}
              >
                <TaskItem {...item} />
              </ReanimatedSwipeable>
            )
          }}
        />
        <View className="h-[50px]" />
      </View>
    </View>
  );
}
