import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font'; // Import font loader from expo
import AppLoading from 'expo-app-loading'; // Optional for splash-like behavior
import SplashScreen from './SplashScreen';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const router = useRouter();

  // Load custom fonts asynchronously
  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
      'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),
      
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        await loadFonts(); // Ensure fonts are loaded first

        // Check if the app has launched before
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          // If the app is launched for the first time, show splash screen
          setShowSplash(true);
          await AsyncStorage.setItem('hasLaunched', 'true');
        } else {
          // If not the first launch, check authentication
          setShowSplash(true);
          // checkAuth();
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
        router.replace('/login');
      } finally {
        setIsLoading(false);
      }
    };

    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Navigate to the learning page if a token exists
          router.replace('/belajar');
        } else {
          // Otherwise, navigate to the login page
          router.replace('/login');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        router.replace('/login');
      }
    };

    checkFirstLaunch();
  }, [router]);

  if (!fontsLoaded) {
    // Display a loading indicator while fonts are being loaded
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(error) => console.error('Font loading error:', error)}
      />
    );
  }

  if (isLoading) {
    // Show a loading indicator during initial checks
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (showSplash) {
    // Display splash screen if the app is launched for the first time
    return <SplashScreen />;
  }

  return null; // Default fallback
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;