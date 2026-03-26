import { SubjectData } from "@/types/type";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { View } from "react-native";

export default function SubjectTable({ source }: { source: SubjectData[] }) {
  return (
    <FlashList
      data={source}
      numColumns={5}
      scrollEnabled={true}
      keyExtractor={(item) => item.subjectName}
      estimatedItemSize={70}
      renderItem={({ item }) => (
        <View
          className="border-black border rounded-md
          items-center justify-center
          h-[65px] my-0.5 
          "
        >
          <Link
            href={{
              pathname: "/subject-detail",
              params: item,
            }}
          >
            {item.subjectName}
          </Link>
        </View>
      )}
    />
  );
}
