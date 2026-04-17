import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View>
      <View style={{ height: 40 }} />
      <Text>add some tasks</Text>
      <Link
        className='items-center justify-center m-3 bg-slate-500'
        href="/modal">open modal</Link>


    </View>
  );
}
