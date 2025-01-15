import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import SplashScreen from './SplashScreen';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        // Cek apakah aplikasi sudah pernah dibuka sebelumnya
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          // Jika belum pernah dibuka, tampilkan splash screen
          setShowSplash(true);
          await AsyncStorage.setItem('hasLaunched', 'true');
        } else {
          // Jika sudah pernah dibuka, langsung cek token
          checkAuth();
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
          // Jika token ada, arahkan ke halaman belajar
          router.replace('/belajar');
        } else {
          // Jika tidak ada token, arahkan ke halaman login
          router.replace('/login');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        router.replace('/login');
      }
    };

    checkFirstLaunch();
  }, [router]);

  if (isLoading) {
    // Tampilkan loading indicator selama proses pengecekan berlangsung
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (showSplash) {
    // Tampilkan splash screen jika aplikasi pertama kali dibuka
    return <SplashScreen />;
  }

  return null;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;


