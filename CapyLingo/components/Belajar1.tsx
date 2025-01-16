import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Belajar1 = () => {
  const [username, setUsername] = useState<string>('User');
  const [level, setLevel] = useState<number>(1); // Default level
  const router = useRouter();

  // Animasi naik-turun
  const animation = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    // Mulai animasi jika ada level yang aktif
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [level]);

  const levelIcons = [
    { id: 1, image: require('../assets/images/level1.png'), align: 'flex-start' as 'flex-start' },
    { id: 2, image: require('../assets/images/level-2.png'), align: 'center' as 'center' },
    { id: 3, image: require('../assets/images/level-3.png'), align: 'flex-end' as 'flex-end' },
    { id: 4, image: require('../assets/images/level-4.png'), align: 'center' as 'center' },
    { id: 5, image: require('../assets/images/level-5.png'), align: 'flex-start' as 'flex-start' },
  ];

  const renderLevelIcons = () => {
    return levelIcons.map((item) => {
      const isActive = item.id === level;

      return (
        <View
          key={item.id}
          style={{
            alignItems: item.align,
            marginHorizontal: 20, // Margin kanan-kiri untuk ikon
          }}
        >
          {isActive ? (
            // Jika aktif, tampilkan lingkaran luar dan inner dengan animasi
            <TouchableOpacity
              style={styles.touchableArea}
              onPress={() => router.push(`/quiz?level=${item.id}`)}
            >
              <Animated.View
                style={[
                  styles.outerCircle,
                  {
                    transform: [{ translateY: animation }],
                  },
                ]}
              >
                <View style={styles.levelCircle}>
                  <Image source={item.image} style={styles.levelImage} />
                </View>
              </Animated.View>
            </TouchableOpacity>
          ) : (
            // Jika tidak aktif, tampilkan ikon tanpa lingkaran luar dan tidak bisa dipencet
            <View style={[styles.levelCircle, styles.inactiveLevel]}>
              <Image source={item.image} style={styles.levelImage} />
            </View>
          )}
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Mantra Card */}
        <View style={styles.mantraCard}>
          <Text style={styles.greeting}>Hello {username}!</Text>
          <View style={styles.mantraContent}>
            <View style={styles.mantraLeft}>
              <Image
                source={require('../assets/images/piala.png')}
                style={styles.trophyImage}
              />
              <Text style={styles.levelText}>Level {level}</Text>
            </View>
            <View style={styles.mantraRight}>
              <Text style={styles.mantraTitle}>Today's Mantra</Text>
              <Text style={styles.mantraText}>
                Challenges are what make life interesting; overcoming them is what makes life meaningful.
              </Text>
            </View>
          </View>
        </View>

        {/* Levels Section */}
        <View style={styles.levelSection}>{renderLevelIcons()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  mantraCard: {
    marginTop: 30,
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFB0B0', 
    shadowColor: '#FFB0B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
    maxWidth: 600,
  },
  greeting: {
    fontSize: 20,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Poppins-Bold',
  },
  mantraContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mantraLeft: {
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
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  mantraRight: {
    flex: 2,
    paddingLeft: 15,
  },
  mantraTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 4,
  },
  mantraText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    lineHeight: 20,
  },
  levelSection: {
    marginTop: 20,
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
  },
  touchableArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff7d1', 
  },
  levelCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd09b', 
  },
  inactiveLevel: {
    backgroundColor: '#ccc', 
  },
  levelImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
});

export default Belajar1;