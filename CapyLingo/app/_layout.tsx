import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { Slot, useRouter, useSegments } from 'expo-router';
import Navbar from '../components/Navbar'; // Import the Navbar component

export default function Layout() {
  const router = useRouter();
  const segments = useSegments(); // Get current route segments

  // Check if the current route should show the navbar
  const showNavbar = ['/belajar', '/quiz', '/vocab'].includes(`/${segments.join('/')}`);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#FFB0B0" />
      <Slot /> {/* Slot for rendering dynamic content */}

      {/* Conditionally render Navbar */}
      {showNavbar && <Navbar />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});