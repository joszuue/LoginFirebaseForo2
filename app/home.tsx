import { useLocalSearchParams } from 'expo-router';
import HomeScreen from '../screens/HomeScreen';

export default function HomePage() {
  const params = useLocalSearchParams();

  return <HomeScreen route={{ params }} />;
}
