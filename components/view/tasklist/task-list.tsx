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
  const fetchData = async () => {
    try {
      const data: TaskDetail[] = await getSubjectDetail(SubjectData);
      setTaskList(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching subject detail:", error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
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
        <Button
          title="データ更新"
          onPress={() => {
            setIsLoading(true);
            fetchData();
            setIsError(false);
          }}
        />
        <FlashList
          data={taskList}
          renderItem={({ item }) => (
            <View>
              {item.Status !== "完了" && item.IsDue !== "Passed" && (
                <View className="justify-between p-2 bg-slate-300 rounded-md m-0.5">
                  <Text className="text-xl font-semibold">{item.TaskName}</Text>
                  <Text>{item.Status}</Text>
                  <Text className="text-green-500">{item.Due}</Text>
                </View>
              )}
              {item.IsDue === "Passed" && item.Status !== "完了" && (
                <View className="justify-between p-2 bg-slate-300 rounded-md m-0.5">
                  <Text className="text-red-500">期限超過</Text>
                  <Text className="text-xl font-semibold">{item.TaskName}</Text>
                  <Text>{item.Status}</Text>
                  <Text className="text-red-500">{item.Due}</Text>
                </View>
              )}
            </View>
          )}
        />
        <View className="h-[50px]" />
        <FlashList
          data={taskList}
          renderItem={({ item }) => (
            <View>
              {item.Status === "完了" && (
                <View className="justify-between p-2 bg-slate-300 rounded-md m-0.5">
                  <Text className="text-green-500">完了</Text>
                  <Text className="text-xl font-semibold">{item.TaskName}</Text>
                  <Text>{item.Status}</Text>
                  <Text className="text-green-500">{item.Due}</Text>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
}
