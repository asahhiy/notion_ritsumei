import { Text, View } from "react-native"
import { FlashList } from "@shopify/flash-list"


const data = [{
  subject: "数学1"
},
{
  subject: "数学2"
},
{
  subject: "数学3"
},
{
  subject: "数学4"
},
{
  subject: "数学5"
},
{
  subject: "数学6"
}, {
  subject: "数学7"
}, {
  subject: "数学8"
}, {
  subject: "数学9"
}, {
  subject: "数学10"
}, {
  subject: "数学11"
}, {
  subject: "数学12"
}, {
  subject: "数学13"
}, {
  subject: "数学14"
}, {
  subject: "数学15"
}, {
  subject: "数学16"
}, {
  subject: "数学17"
}, {
  subject: "数学18"
}, {
  subject: "数学19"
}, {
  subject: "数学20"
}, {
  subject: "数学21"
}, {
  subject: "数学22"
}, {
  subject: "数学23"
}, {
  subject: "数学24"
}, {
  subject: "数学25"
}, {
  subject: "数学26"
}, {
  subject: "数学27"
}, {
  subject: "数学28"
}, {
  subject: "数学29"
}, {
  subject: "数学30"
}]



export default function SubjectTable() {
  return (
    <FlashList
      data={data}
      numColumns={5}
      className="mx-2.5"
      scrollEnabled={false}
      renderItem={({ item }) => (
        <View
          className="border-black border rounded-md
          items-center justify-center
          h-[60px] w-[50px] my-0.5 mx-0.5
          ">
          <Text>{item.subject}</Text>
        </View>
      )}
    />
  )
}
