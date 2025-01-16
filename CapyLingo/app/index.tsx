import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font'; // Import font loader
import SplashScreen from './SplashScreen';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true); // Overall loading state
  const [fontsLoaded, setFontsLoaded] = useState(false); // Font loading state
  const [showSplash, setShowSplash] = useState(false); // Splash screen state
  const router = useRouter();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load custom fonts
        await Font.loadAsync({
          'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
          'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),
        });
        setFontsLoaded(true);

        // Check if the app has launched before
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (!hasLaunched) {
          // First launch
          setShowSplash(true);
          await AsyncStorage.setItem('hasLaunched', 'true');
        } else {
          setShowSplash(true);
          // Check authentication on subsequent launches
          // checkAuth();
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        router.replace('/login');
      } finally {
        setIsLoading(false); // Ensure loading state is cleared
      }
    };

    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Navigate to the learning page if authenticated
          router.replace('/belajar');
        } else {
          // Navigate to login page if not authenticated
          router.replace('/login');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        router.replace('/login');
      }
    };

    initializeApp();
  }, [router]);

  // Render loading indicator during initialization
  if (isLoading || !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  // Show splash screen if needed
  if (showSplash) {
    return <SplashScreen />;
  }

  return null; // Fallback if no state is set
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;