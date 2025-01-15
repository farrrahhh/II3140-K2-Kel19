import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import { useRouter } from 'expo-router';

const Signup = () => {
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

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    try {
      // Kirim permintaan signup ke backend
      const response = await fetch('https://capy-lingo-backend.vercel.app/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        
        // Navigasi ke halaman belajar
        router.replace('/login');
      } else {
        setErrorMessage(result.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('An error occurred. Please try again later.');
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
        <Text style={styles.formTitle}>Sign Up</Text>
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
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.bottomLink}>
            Already have an account? <Text style={styles.linkText}>Log In</Text>
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
    backgroundColor: '#ffb0b0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    height: '40%',
  },
  pictureText: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontFamily: 'Comfortaa',
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 24,
    fontFamily: 'Poor Story',
    textAlign: 'center',
    color: '#333',
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
    color: '#333',
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
    color: '#333',
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
    color: '#333',
    textDecorationLine: 'underline',
  },
});

export default Signup;