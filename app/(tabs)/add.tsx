import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { TaskItem } from '@/src/views/components/tasklist/TaskItem';
import { ThemedView } from '@/src/views/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1">
      <View style={{ height: 40 }} />
      <Text>tasks list</Text>
      <Link
        className='items-center justify-center m-3 bg-slate-500'
        href="/modal">open modal</Link>
      <TaskItem
        re_Subject_id=''
        re_Subject_name='ソフトウェア工学'
        TaskName='テスト用タスク名'
        Status='未完了'
        Due='2026/5/1'
        IsDue='OK'
      />
      <TaskItem
        re_Subject_id=''
        re_Subject_name='ソフトウェア工学'
        TaskName='テスト用タスク名2'
        Status='未完了'
        Due='2026/5/1'
        IsDue='OK'
      />
      <TaskItem
        re_Subject_id=''
        re_Subject_name='ソフトウェア工学'
        TaskName='テスト用タスク名3'
        Status='未完了'
        Due='2026/5/1'
        IsDue='OK'
      />


    </ThemedView>
  );
}
