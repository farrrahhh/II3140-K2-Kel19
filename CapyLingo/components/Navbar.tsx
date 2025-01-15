import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useFonts } from 'expo-font';

const Navbar = () => {
  const router = useRouter();
  const currentPath = usePathname();

  // Load Poppins fonts
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const handleNavigation = (route: string) => {
    if (route === '/belajar') {
      router.replace(route);
    } else {
      router.push(route as any);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const navItems = [
    {
      route: '/belajar',
      icon: require('../assets/images/home.png'),
      label: 'Home',
    },
    {
      route: '/vocab',
      icon: require('../assets/images/book.png'),
      label: 'Vocab',
    },
    {
      route: '/profile',
      icon: require('../assets/images/profile.png'),
      label: 'Profile',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navbarContainer}>
        {navItems.map((item) => {
          const isActive = currentPath === item.route;
          return (
            <TouchableOpacity
              key={item.route}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => handleNavigation(item.route)}
              accessibilityLabel={item.label}
              accessibilityState={{ selected: isActive }}
            >
              <View style={styles.iconContainer}>
                <Image
                  source={item.icon}
                  style={[
                    styles.icon,
                    isActive && styles.activeIcon,
                  ]}
                  resizeMode="contain" 
                />
                {isActive && <View style={styles.activeIndicator} />}
              </View>
              <Text
                style={[
                  styles.navText,
                  isActive && styles.activeNavText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Add safe area padding for iOS devices */}
      {Platform.OS === 'ios' && <View style={styles.iosSafeArea} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFB0B0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    overflow: 'hidden', // Agar konten di dalam mengikuti border radius
  },
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#FFB0B0',
  },
  navItem: {
    alignItems: 'center',
    minWidth: 64,
    position: 'relative',
  },
  activeNavItem: {
    transform: [{ scale: 1.05 }],
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 4,
    position: 'relative',
  },
  icon: {
    width: 32,
    height: 32,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  activeIcon: {
    
  },
  navText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },
  activeNavText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
  },
  iosSafeArea: {
    height: Platform.OS === 'ios' ? 24 : 0,
    backgroundColor: '#FFB0B0',
  },
});

export default Navbar;