import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Profile = () => {
  const [username, setUsername] = useState<string>('User');
  const [email, setEmail] = useState<string>('user@example.com');
  const [level, setLevel] = useState<number>(1);
  const router = useRouter();

  // Fetch data user dari AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedLevel = await AsyncStorage.getItem('level');
        const storedEmail = await AsyncStorage.getItem('email');

        if (storedUsername) setUsername(storedUsername);
        if (storedLevel) setLevel(parseInt(storedLevel, 10));
        if (storedEmail) setEmail(storedEmail);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            await AsyncStorage.clear(); // Menghapus semua data dari AsyncStorage
            router.replace('/login'); // Arahkan ke halaman login
          } catch (error) {
            console.error('Failed to logout:', error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        
        <Text style={styles.username}>Username: {username}</Text>
        <Text style={styles.email}>Email: {email}</Text>
        <Text style={styles.level}>Level: {level}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    padding: 20,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
  email: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  level: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#FFB0B0',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '60%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
  },
});

export default Profile;