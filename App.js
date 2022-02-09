import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from './style';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.home_text}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );

}
