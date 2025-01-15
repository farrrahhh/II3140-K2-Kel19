import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

// import Belajar1 from component
import Belajar1 from '../../components/Belajar1';
import Belajar2 from '../../components/Belajar2';
import Belajar3 from '../../components/Belajar3';
import Belajar4 from '../../components/Belajar4';
import Belajar5 from '../../components/Belajar5';


const Belajar = () => {
  const [level, setLevel] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserLevel = async () => {
      try {
        const storedLevel = await AsyncStorage.getItem('level');
        if (storedLevel) {
          setLevel(parseInt(storedLevel, 10));
        } else {
          router.replace('/login'); // Jika level tidak ditemukan, arahkan ke halaman login
        }
      } catch (error) {
        console.error('Failed to load user level:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserLevel();
  }, [router]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFB0B0" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // Render komponen berdasarkan level
  switch (level) {
    case 1:
      return <Belajar1 />;
    case 2:
      return <Belajar2 />;
    case 3:
      return <Belajar3 />;
    case 4:
      return <Belajar4 />;
    case 5:
      return <Belajar5 />;
    default:
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Invalid level. Please log in again.</Text>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default Belajar;