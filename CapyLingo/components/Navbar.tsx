import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
      icon: 'home',
      label: 'Home',
    },
    {
      route: '/vocab',
      icon: 'book',
      label: 'Vocab',
    },
    {
      route: '/profile',
      icon: 'person',
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
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={isActive ? '#FFFFFF' : '#FFB0B0'}
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
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
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