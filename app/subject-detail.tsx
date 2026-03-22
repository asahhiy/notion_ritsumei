import { View, Text } from 'react-native';
import { SubjectData } from '@/types/type';
import { useLocalSearchParams } from 'expo-router';


export default function SubjectDetailScreen() {
  const { subjectName, day, when } = useLocalSearchParams() as SubjectData
  return (
    <View>
      <Text>this is test</Text>
      <Text >{subjectName}</Text>
      <Text className='text-2xl text-left'>{day}{when}</Text>
    </View>
  )
}
