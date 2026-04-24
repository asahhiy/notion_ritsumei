import { SubjectData } from "@/src/models/types/type";
import { useTaskViewModel } from "@/src/viewmodels/hooks/useTaskViewModel";
import { FlashList } from "@shopify/flash-list";
import { Button, Text, View } from "react-native";
import { TaskItem } from "../../tasklist/TaskItem";

export default function TaskList({
  subjectData,
}: {
  subjectData: SubjectData;
}) {
  const { tasks, isLoading, isError, refetch } = useTaskViewModel(subjectData);

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
        <FlashList
          data={tasks}
          renderItem={({ item }) => (
            <TaskItem
              {...item}
            />
          )}
        />
        <View className="h-[50px]" />
      </View>
    </View>
  );
}
