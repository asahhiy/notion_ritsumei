import { Text, View, StyleSheet } from "react-native"
import { FlashList } from "@shopify/flash-list"

const data = [{
  title: "月"
},
{
  title: "火"
},
{
  title: "水"
}, {
  title: "木"
}, {
  title: "金"
}, {
  title: "論理回路"
}]


export default function ClassTable() {


  return (
    <View style={{ flex: 1 }}>
      <Text>
        this is the class table prefab
      </Text>
      <Text>aaa</Text>
      <FlashList
        data={data}
        numColumns={6}
        style={{ height: 100 }}
        renderItem={({ item }) =>
          <View style={styles.item}>
            <Text style={styles.text}>{item.title}</Text>
          </View>}
        keyExtractor={(item) => item.title}

      />
    </View>

  )
}


const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black",
    flex: 1,
    height: 50,
  },
  text: {
    textAlign: "center",
  }
})


