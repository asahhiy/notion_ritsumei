import { Text, View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { SubjectData } from "@/types/type"
import { Link } from "expo-router"





export default function SubjectTable({ source }: { source: SubjectData[] }) {
  return (
    <FlashList
      data={source}
      numColumns={5}
      scrollEnabled={true}
      renderItem={({ item }) => (
        <View
          className="border-black border rounded-md
          items-center justify-center
          h-[60px] my-0.5 
          ">
          <Link href={{
            pathname: "/subject-detail",
            params: item
          }}>{item.subjectName}</Link>
        </View>
      )}
    />
  )
}
