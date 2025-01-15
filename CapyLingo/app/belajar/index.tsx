import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Belajar = () => {
  const [username, setUsername] = useState<string>('');
  const [level, setLevel] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedLevel = await AsyncStorage.getItem('level');

        if (storedUsername) setUsername(storedUsername);
        if (storedLevel) setLevel(parseInt(storedLevel, 10));
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear(); // Hapus semua data dari AsyncStorage
    router.replace('/login'); // Kembali ke halaman login
  };

  const renderLevelContent = () => {
    return (
      <View style={styles.levelContainer}>
        <Text style={styles.levelTitle}>Level {level}</Text>
        <Image
          source={{ uri: `https://capy-lingo-assets.vercel.app/images/level-${level}.png` }}
          style={styles.levelImage}
        />
        <Text style={styles.levelDescription}>
          {`Welcome to Level ${level}! Complete the quiz to move to the next level.`}
        </Text>
        <Button
          title={`Start Level ${level} Quiz`}
          onPress={() => router.push(`/quiz/level${level}`)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, {username}!</Text>
      {renderLevelContent()}
      <Button title="Logout" onPress={handleLogout} color="#ff5c5c" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  levelContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  levelImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  levelDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Belajar;