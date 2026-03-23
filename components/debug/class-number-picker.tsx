import { SubjectData } from "@/types/type";
import { getSubjectDetail } from "@/utils/getsubjectdetail";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button, View } from "react-native";

export default function ClassNumberPicker() {
  const [selectedDay, setSelectedDay] = useState("monday");
  const [selectedNumber, setSelectedNumber] = useState("1");
  return (
    <View>
      <Picker
        selectedValue={selectedNumber}
        onValueChange={(itemValue) => setSelectedNumber(itemValue)}
      >
        <Picker.Item label="1限" value="1" />
        <Picker.Item label="2限" value="2" />
        <Picker.Item label="3限" value="3" />
        <Picker.Item label="4限" value="4" />
        <Picker.Item label="5限" value="5" />
        <Picker.Item label="6限" value="6" />
      </Picker>
      <Picker
        selectedValue={selectedDay}
        onValueChange={(itemValue) => setSelectedDay(itemValue)}
      >
        <Picker.Item label="Monday" value="monday" />
        <Picker.Item label="Tuesday" value="tuesday" />
        <Picker.Item label="Wednesday" value="wednesday" />
        <Picker.Item label="Thursday" value="thursday" />
        <Picker.Item label="Friday" value="friday" />
      </Picker>

      <Button
        title="Get Subject Detail"
        onPress={async () => {
          const subjectData: SubjectData = {
            subjectName: "Sample Subject",
            day: selectedDay,
            when: selectedNumber,
          };

          const detail = await getSubjectDetail(subjectData);
        }}
      />
    </View>
  );
}
