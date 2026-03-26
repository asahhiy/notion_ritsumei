import { Text, View } from "react-native";

const data = [
  {
    title: "月",
  },
  {
    title: "火",
  },
  {
    title: "水",
  },
  {
    title: "木",
  },
  {
    title: "金",
  },
];

export default function DayDisplay() {
  return (
    <View className="flex-row">
      <View className="h-[40px] w-[25px] mb-1" />
      {data.map((item) => (
        <View
          key={item.title}
          className="rounded-md items-center justify-center h-[40px] w-[73px]"
        >
          <Text>{item.title}</Text>
        </View>
      ))}
    </View>
  );
}
