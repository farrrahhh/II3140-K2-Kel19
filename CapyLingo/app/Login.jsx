import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input
    if (!username || !password) {
      setErrorMessage('Please fill in both fields');
      return;
    }

    try {
      // Send login request to backend
      const response = await fetch('https://capy-lingo-backend.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store user data in sessionStorage
        sessionStorage.setItem('token', result.token);
        sessionStorage.setItem('userId', result.userId);
        sessionStorage.setItem('username', result.username);
        sessionStorage.setItem('level', result.level); // Store user level

        // Navigate to user-specific page based on level
        router.replace(`/belajar/level${result.level}.html`);
      } else {
        setErrorMessage(result.message); // Show server message if any error occurs
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.subtitle}>
        Ready to sharpen your English skills and have some fun? Let’s get started!
      </Text>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        required
      />
      <Button title="Log In" onPress={handleSubmit} />
      <Text style={styles.bottomLink}>
        Don't have an account? <Text onPress={() => router.push('/sign-up/signup.html')}>Sign Up</Text>
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
});

export default Login;