import { SubjectData, TaskDetail } from "@/types/type";
import { getSubjectDetail } from "@/utils/getsubjectdetail";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export default function TaskList({
  SubjectData,
}: {
  SubjectData: SubjectData;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [taskList, setTaskList] = useState<TaskDetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: { TaskName: string; Status: string; Due: string }[] =
          await getSubjectDetail(SubjectData);
        setTaskList(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching subject detail:", error);
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, []);

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
            setIsLoading(true);
            setIsError(false);
          }}
        />
      </View>
    );
  }

  if (taskList.length === 0) {
    return (
      <View>
        <Text>現在この科目にはタスクがありません。</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className=" h-[400px] p-1 justify-start">
        <FlashList
          data={taskList}
          renderItem={({ item }) => (
            <View className="flex-row justify-between p-2 border-b">
              <Text>{item.TaskName}</Text>
              <Text>{item.Status}</Text>
              <Text>{item.Due}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
