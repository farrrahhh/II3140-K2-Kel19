import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    // Validasi input
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please fill in both fields');
      return;
    }

    try {
      // Kirim permintaan login ke backend
      const response = await fetch('https://capy-lingo-backend.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Simpan data user di AsyncStorage
        await AsyncStorage.setItem('token', result.token);
        await AsyncStorage.setItem('userId', result.userId.toString());
        await AsyncStorage.setItem('username', result.username);
        await AsyncStorage.setItem('level', result.level.toString()); // Simpan level user

        // Navigasi ke halaman belajar sesuai level
        router.replace(`/belajar`);
      } else {
        setErrorMessage(result.message); // Tampilkan pesan error dari server
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.subtitle}>
        Ready to sharpen your English skills and have some fun? Let’s get started!
      </Text>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleSubmit} />
      <Text style={styles.bottomLink}>
        Don't have an account?{' '}
        <Text style={styles.linkText} onPress={() => router.push('/sign-up/signup.html')}>
          Sign Up
        </Text>
      </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  bottomLink: {
    marginTop: 20,
    color: 'blue',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Login;