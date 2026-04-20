import { SubjectData, TaskDetail } from "@/src/models/types/type";
import { getSubjectDetail } from "@/src/services/notion/getsubjectdetail";
import { FlashList } from "@shopify/flash-list";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { TaskItem } from "../../tasklist/TaskItem";

export default function TaskList({
  subjectData,
}: {
  subjectData: SubjectData;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [taskList, setTaskList] = useState<TaskDetail[]>([]);
  const fetchData = async () => {
    try {
      const data: TaskDetail[] = await getSubjectDetail(subjectData);
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
          title="タスクデータ更新"
          onPress={async () => {
            setIsError(false);
            setIsLoading(true);
            await fetchData();
          }}
        />
        <FlashList
          data={taskList}
          renderItem={({ item }) => (
            <View>
              {item.Status !== "完了" && item.IsDue !== "Passed" && (
                <View className="flex flex-row items-center p-2 bg-slate-300 rounded-md m-0.5">
                  <SymbolView
                    name="exclamationmark.triangle"
                    size={24}
                    tintColor="#FFA500"
                  />
                  <View>
                    <Text className="text-xl font-semibold">
                      {item.TaskName}
                    </Text>
                    <Text>{item.Status}</Text>
                    <Text className="text-green-500">{item.Due}</Text>
                  </View>
                </View>
              )}
              {item.IsDue === "Passed" && item.Status !== "完了" && (
                <TaskItem
                  re_Subject_name=""
                  re_Subject_id=""
                  TaskName={item.TaskName}
                  Due={item.Due}
                  IsDue={item.IsDue}
                  Status={item.Status}
                />
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
                <TaskItem
                  re_Subject_name=""
                  re_Subject_id=""
                  TaskName={item.TaskName}
                  Due={item.Due}
                  IsDue={item.IsDue}
                  Status={item.Status}
                />

              )}
            </View>
          )}
        />
      </View>
    </View>
  );
}
