import { View, Text, StyleSheet } from 'react-native';
export default function PlaceholderScreen() {
  return <View style={styles.c}><Text>Coming soon...</Text></View>;
}
const styles = StyleSheet.create({ c: { flex: 1, justifyContent: 'center', alignItems: 'center' } });