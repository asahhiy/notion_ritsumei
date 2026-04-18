import { Text, View, Button } from "react-native"
import DayDisplay from "./table/daydisplay"
import TimeDisplay from "./table/timedisplay"
import SubjectTable from "./table/subject-table"
import getSubjectList from "@/src/services/notion/getsubjectlist"
import { SubjectData } from "@/src/models/types/type"
import { useEffect, useState } from "react"

export default function ClassTable() {
  const [response, setResponse] = useState<SubjectData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubjectList()
        setResponse(data)

      } catch (error) {
        console.error("Error fetching subject list:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    )
  }


  return (
    <View className="flex-1">
      <Button title="test" onPress={async () => {
        const response = await getSubjectList()
        setResponse(response)
      }} />

      <DayDisplay />
      <View className="flex-row mt-1">
        <TimeDisplay />
        <View className="flex-1">
          <SubjectTable source={response} />
        </View>
      </View>


    </View>


  )
}


