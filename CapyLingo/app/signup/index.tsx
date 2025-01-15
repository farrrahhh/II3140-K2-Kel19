import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    // Validate input
    if (!username || !password) {
      setErrorMessage('Please fill in both fields');
      return;
    }

    try {
      // Send login request to backend
      const response = await fetch('https://capy-lingo-backend.vercel.app/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store user data in AsyncStorage (React Native's equivalent to sessionStorage)
        // You'll need to import AsyncStorage from '@react-native-async-storage/async-storage'
        // and install the package if you haven't already
        // AsyncStorage.setItem('token', result.token);
        // AsyncStorage.setItem('userId', result.userId);
        // AsyncStorage.setItem('username', result.username);
        // AsyncStorage.setItem('level', result.level.toString());

        // Navigate to user-specific page based on level
        router.replace(`/belajar`);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formPicture}>
        <View style={styles.pictureText}>
          <Text style={styles.title}>Capy Lingo</Text>
          <Text style={styles.subtitle}>Learn English with Capybara</Text>
        </View>
      </View>
      <View style={styles.formBox}>
        <Text style={styles.formTitle}>Signup</Text>
        <Text style={styles.formSubtitle}>
          Ready to sharpen your English skills and have some fun? Let's get started!
        </Text>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#888"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.bottomLink}>
            Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  formPicture: {
    backgroundColor: '#ffb0b0', // Updated to use the primary color
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    height: '40%', // Adjust this value to control the height of the pink section
  },
  pictureText: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontFamily: 'Comfortaa',
    fontWeight: '700',
    marginBottom: 10,
    color: '#333', // Adjusted for better contrast on pink background
  },
  subtitle: {
    fontSize: 24,
    fontFamily: 'Poor Story',
    textAlign: 'center',
    color: '#333', // Adjusted for better contrast on pink background
  },
  formBox: {
    padding: 20,
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ffb0b0',
  },
  formTitle: {      
    fontSize: 32,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#00000',
    marginBottom: 10,
  },
  formSubtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'Poppins',
  },
  inputField: {
    width: '100%',
    marginBottom: 15,
    fontFamily: 'Poppins',
  },
  input: {
    width: '100%',
    padding: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontFamily: 'Poppins',
  },
  button: {
    backgroundColor: '#FFD09B',
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    borderColor: '#333',
  },
  buttonText: {
    color: '#00000',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  bottomLink: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  linkText: {
    color: '#00000',
    textDecorationLine: 'underline',
  },
});

export default Signup;

