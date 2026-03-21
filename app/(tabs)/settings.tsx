import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';

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
