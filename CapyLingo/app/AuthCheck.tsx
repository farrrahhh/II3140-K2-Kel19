import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const AuthCheck: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Jika token ada, langsung arahkan ke halaman belajar
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

    checkAuth();
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthCheck;