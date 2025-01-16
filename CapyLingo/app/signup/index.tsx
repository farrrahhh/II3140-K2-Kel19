import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font'; // For font loading

const { width } = Dimensions.get('window');

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Show/hide password
  const [errorMessage, setErrorMessage] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please fill in both fields');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch('https://capy-lingo-backend.vercel.app/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        router.replace('/login');
      } else {
        setErrorMessage(result.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  // Show loading spinner while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFB0B0" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            <View style={styles.gradientBackground}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/images/playing_music.png')}
                  style={{
                    width: width > 768 ? width / 3 : width / 1.2,
                    height: width > 768 ? width / 3 : width / 1.2,
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Sign Up</Text>
              <Text style={styles.formSubtitle}>
                Ready to sharpen your English skills and have some fun? Let's get started!
              </Text>

              {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

              <View style={styles.inputContainer}>
                <Image
                  source={require('../../assets/images/profilepict.png')}
                  style={styles.inputIconImage}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  placeholderTextColor="#888"
                />
              </View>

              <View style={styles.inputContainer}>
                <Image
                  source={require('../../assets/images/lock.png')}
                  style={styles.inputIconImage}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor="#888"
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIcon}
                >
                  <Image
                    source={require('../../assets/images/eye.png')}
                    style={styles.eyeIconImage}
                  />
                </TouchableOpacity>
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
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB0B0',
  },
  inputIconImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  eyeIconImage: {
    width: 24,
    height: 24,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB0B0',
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
    padding: width > 768 ? 40 : 20,
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
    fontSize: width > 768 ? 48 : 32,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  formSubtitle: {
    fontSize: width > 768 ? 20 : 16,
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
    fontSize: width > 768 ? 20 : 16,
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
    fontSize: width > 768 ? 22 : 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  bottomLink: {
    marginTop: 20,
    fontSize: width > 768 ? 18 : 16,
    fontFamily: 'Poppins',
    textAlign: 'center',
    color: '#666',
  },
  linkText: {
    color: '#FFB0B0',
    textDecorationLine: 'underline',
  },
});

export default Signup;