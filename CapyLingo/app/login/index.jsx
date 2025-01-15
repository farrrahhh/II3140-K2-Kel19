import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State untuk show/hide password
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const fadeAnim = useState(new Animated.Value(0))[0];

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSubmit = async () => {
    if (!username || !password) {
      setErrorMessage('Please fill in both fields');
      return;
    }

    try {
      const response = await fetch('https://capy-lingo-backend.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        router.replace('/belajar');
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            <View style={styles.gradientBackground}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/images/window.png')}
                  style={{ width: width / 1.5, height: width / 1.5 }}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Welcome Back!</Text>
              <Text style={styles.formSubtitle}>
                Ready to sharpen your English skills and have some fun? Let's get started!
              </Text>
              {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={24} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  placeholderTextColor="#888"
                />
              </View>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={24} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible} // Tampilkan password jika isPasswordVisible true
                  placeholderTextColor="#888"
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/signup')}>
                <Text style={styles.bottomLink}>
                  Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  gradientBackground: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB0B0',
  },
  logoContainer: {
    alignItems: 'center',
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  formTitle: {
    fontSize: 32,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  formSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins',
  },
  errorMessage: {
    color: '#FF6B6B',
    marginBottom: 10,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  eyeIcon: {
    padding: 5,
  },
  button: {
    backgroundColor: '#FFD09B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
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
    textAlign: 'center',
    color: '#666',
  },
  linkText: {
    color: '#FFB0B0',
    textDecorationLine: 'underline',
  },
});

export default Login;