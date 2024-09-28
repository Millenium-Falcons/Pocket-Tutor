import { View,Text,Image, StyleSheet, Platform } from 'react-native';
import { Button } from '../components/Button';


export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-orange-400">Hello World</Text>
      <Button label="Press here"></Button>
    </View>
  );
}


