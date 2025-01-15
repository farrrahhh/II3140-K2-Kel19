import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router'; 
import { loadFonts } from '../components/FontLoader'; 

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Selamat Datang di CapyLingo",
    description: "Mulailah perjalanan bahasa Inggris yang menyenangkan bersama Capybara kami!",
    image: require("../assets/images/capybara1.png"),
  },
  {
    id: "2",
    title: "Belajar Bahasa Inggris Tanpa Batas",
    description: "Pahami, pelajari, dan kuasai bahasa Inggris kapan saja, di mana saja.",
    image: require("../assets/images/capybara2.png"),
  },
  {
    id: "3",
    title: "Bersiap untuk Meningkatkan Level!",
    description: "Selangkah lebih dekat menuju kefasihan bahasa Inggris.",
    image: require("../assets/images/capybara3.png"),
  },
];

const SplashScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter(); 

  const imageAnim = useRef(new Animated.Value(0)).current; // Create animation for the image

  useEffect(() => {
    const fetchFonts = async () => {
      await loadFonts(); 
      setFontsLoaded(true); 
    };
    fetchFonts();

    // Start the animation as soon as the component loads
    Animated.timing(imageAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const navigateToHome = () => {
    router.push('/login');
  };

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {/* Image with animation */}
            <Animated.Image
              source={item.image}
              style={[
                styles.image,
                {
                  opacity: imageAnim, 
                  transform: [
                    {
                      scale: imageAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
      
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {currentIndex === slides.length - 1 && (
        <TouchableOpacity style={styles.button} onPress={navigateToHome}>
          <Text style={styles.buttonText}>Study with Capybara!</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7D1",
  },
  slide: {
    width,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: "contain",
    marginBottom: 0,
  },
  title: {
    fontFamily: 'Poppins-SemiBold', 
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    fontFamily: 'Poppins-Light',
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#FFD09B",
  },
  inactiveDot: {
    backgroundColor: "#FFE3B6",
  },
  button: {
    position: "absolute",
    bottom: 50,
    left: width * 0.1,
    right: width * 0.1,
    backgroundColor: "#FFB0B0",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SplashScreen;
