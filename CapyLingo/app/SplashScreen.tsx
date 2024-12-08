import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { loadFonts } from '../components/FontLoader'; 

export default function SplashScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };
    fetchFonts();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        router.replace('/Login'); 
      }, 4000); 

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, router]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>CapyLingo</Text>
      <Text style={styles.tagline}>Learn English the Capybara Way: </Text>
      <Text style={styles.tagline}>Calm, Confident, and Clever!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB0B0',
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB0B0',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 60,
    color: '#333333',
    fontFamily: 'Comfortaa', 
  },
  tagline: {
    fontSize: 32,
    color: '#333333',
    fontFamily: 'PoorStory', 
  }
});