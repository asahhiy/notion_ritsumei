import { View } from 'react-native';

import ClassScheduleView from '@/src/views/components/view/class-schedule-view';
import NextClassCard from '@/src/views/components/view/class-schedule/next-class-card';
import TodayTaskCard from '@/src/views/components/view/class-schedule/today-task-view';

export default function HomeScreen() {
  return (
    <View>
      <View style={{ height: 40 }} />
      <NextClassCard />
      <TodayTaskCard />
      <ClassScheduleView />

    </View>
  );
}

