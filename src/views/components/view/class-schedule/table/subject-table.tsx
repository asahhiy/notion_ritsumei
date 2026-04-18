import { SubjectData } from "@/src/models/types/type";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function SubjectTable({ source }: { source: SubjectData[] }) {
  return (
    <FlashList
      data={source}
      numColumns={5}
      scrollEnabled={true}
      renderItem={({ item }) => (
        <View>
          {item.subjectName === "" ? (
            <Link
              className="h-[67px] flex border-gray-300 border rounded-md"
              href={{
                pathname: "/editsubjectdetail",
                params: {
                  pageId: item.pageId,
                  subjectName: item.subjectName,
                  day: item.day,
                  when: item.when,
                  place: item.place,
                },
              }}
            >
              <View className="flex justify-center items-center w-full h-full">
                <Text className="text-sm font-bold text-gray-400 justify-center text-center">
                  +
                </Text>
              </View>
            </Link>
          ) : (
            <View className=" bg-slate-100 justify-center items-center w-[72px] border-black border rounded-md">
              <View>
                <Link
                  href={{
                    pathname: "/subject-detail",
                    params: item,
                  }}
                  className="h-[65px] flex items-center justify-center"
                >
                  <Text className="text-sm font-bold">{item.subjectName}</Text>
                </Link>
              </View>

              <View className="bg-blue-300 rounded-lg absolute bottom-1 justify-center px-1">
                {item.place !== "未設定" && (
                  <Text className="text-white text-xs text-center">
                    {item.place}
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>
      )}
    />
  );
}
