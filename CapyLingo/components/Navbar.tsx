import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Navbar = () => {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    if (route === '/belajar') {
      router.replace(route); // Use replace for '/belajar'
    } else {
      router.push(route as any); // Use push for other routes
    }
  };

  return (
    <View style={styles.navbarContainer}>
      {/* Tab Home */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation('/belajar')}
        accessibilityLabel="Home"
      >
        <Ionicons name="home" size={24} color="#333" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      {/* Tab Vocab */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation('/vocab')}
        accessibilityLabel="Vocab"
      >
        <Ionicons name="book" size={24} color="#333" />
        <Text style={styles.navText}>Vocab</Text>
      </TouchableOpacity>

      {/* Tab Chat */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation('/profile')}
        accessibilityLabel="Profile"
      >
        <Ionicons name="chatbubbles" size={24} color="#333" />
        <Text style={styles.navText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#333',
  },
});

export default Navbar;