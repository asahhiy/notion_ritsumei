import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import ClassScheduleView from '@/components/view/class-schedule-view';
import NextClassCard from '@/components/view/class-schedule/next-class-card';
import TodayTaskCard from '@/components/view/class-schedule/today-task-view';

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

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
