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

const Belajar5 = () => {
  const [username, setUsername] = useState<string>('User');
  const [level, setLevel] = useState<number>(5); // Default level 5
  const router = useRouter();

  // Animasi naik-turun untuk level 5
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
    // Animasi khusus untuk level 5 yang aktif
    if (level === 5) {
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
    }
  }, [level]);

  const levelIcons = [
    { id: 1, image: require('../assets/images/level1.png'), align: 'flex-start' as 'flex-start' },
    { id: 2, image: require('../assets/images/love-2.png'), align: 'center' as 'center' },
    { id: 3, image: require('../assets/images/book-3.png'), align: 'flex-end' as 'flex-end' },
    { id: 4, image: require('../assets/images/music-4.png'), align: 'center' as 'center' },
    { id: 5, image: require('../assets/images/treasure-5.png'), align: 'flex-start' as 'flex-start' },
  ];

  const renderLevelIcons = () => {
    return levelIcons.map((item) => {
      const isActive = item.id <= 5; // Semua level aktif
      const isAnimating = item.id === 5; // Animasi hanya untuk level 5

      return (
        <View
          key={item.id}
          style={{
            alignItems: item.align,
            marginHorizontal: 20, // Margin kanan-kiri untuk ikon
          }}
        >
          {isActive ? (
            <TouchableOpacity
              style={styles.touchableArea}
              onPress={async () => {
                await AsyncStorage.setItem('level_quiz', item.id.toString()); // Simpan level quiz sementara
                router.push(`/quiz?level=${item.id}`); // Arahkan ke halaman quiz dengan query level
              }}
            >
              <Animated.View
                style={[
                  styles.outerCircle,
                  isAnimating && { transform: [{ translateY: animation }] },
                ]}
              >
                <View style={styles.levelCircle}>
                  <Image source={item.image} style={styles.levelImage} />
                </View>
              </Animated.View>
            </TouchableOpacity>
          ) : (
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
                "The summit is within reach. Keep going, you are almost there!"
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
    marginTop: 50,
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
    borderColor: '#ffd09b', // Warna kuning untuk level aktif
  },
  levelCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd09b', // Warna orange untuk level aktif
  },
  inactiveLevel: {
    backgroundColor: '#ccc', // Warna abu-abu untuk ikon yang tidak aktif
  },
  levelImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
});

export default Belajar5;