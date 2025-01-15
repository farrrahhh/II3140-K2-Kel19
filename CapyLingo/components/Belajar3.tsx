import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const Belajar3 = () => {
  const [username, setUsername] = useState<string>('User');
  const [level, setLevel] = useState<number>(1); // Default level 1
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
    await AsyncStorage.clear();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#FFE5E5', '#FFD09B']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Sidebar */}
          

          {/* Levels Section */}
          <View style={styles.levelSection}>
            <TouchableOpacity
              style={styles.levelCircle}
              onPress={() => router.push(`/quiz?level=${level}`)}
            >
              <View style={styles.outerCircle}>
                <View style={styles.innerCircle}>
                  <Image
                    source={require('../assets/images/level1.png')}
                    style={styles.levelImage}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Mantra Section */}
          <View style={styles.mantraSection}>
            <View style={styles.mantraContent}>
              <Text style={styles.greeting}>Hello {username}!</Text>
              <View style={styles.mantraToday}>
                <View style={styles.contentLeft}>
                  <Image
                    source={require('../assets/images/piala.png')}
                    style={styles.trophyImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.levelText}>Level {level}</Text>
                </View>
                <View style={styles.contentRight}>
                  <Text style={styles.mantraTitle}>Today's Mantra</Text>
                  <Text style={styles.mantraText}>
                    A positive attitude gives you power over your circumstances.
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.mantraImageWrapper}>
              <Image
                source={require('../assets/images/butterfly.gif')}
                style={styles.butterflyImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5E5',
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },

  levelSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  levelCircle: {
    alignItems: 'center',
  },
  outerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: '#FFD09B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFB0B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelImage: {
    width: 80,
    height: 80,
  },
  mantraSection: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  mantraContent: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  mantraToday: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentLeft: {
    flex: 1,
    alignItems: 'center',
  },
  trophyImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  contentRight: {
    flex: 2,
    paddingLeft: 15,
  },
  mantraTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  mantraText: {
    fontSize: 14,
    color: '#666',
  },
  mantraImageWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  butterflyImage: {
    width: 100,
    height: 100,
  },
});

export default Belajar3;