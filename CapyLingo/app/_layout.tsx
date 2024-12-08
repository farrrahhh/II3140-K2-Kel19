// app/_layout.tsx
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { Slot } from 'expo-router'; // Untuk menampilkan konten halaman dinamis

export default function Layout() {
  return (
    <View style={styles.container}>
      
      <StatusBar style="dark" backgroundColor="#FFB0B0" />
      <Slot />
      <View style={styles.footer}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  footer: {
    padding: 10,
    backgroundColor: "#FFF7D1",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
