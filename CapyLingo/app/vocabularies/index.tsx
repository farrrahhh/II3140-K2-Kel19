import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const VocabulariesPage: React.FC = () => {
  const router = useRouter();

  const redirectToLevelPage = async () => {
    try {
      // Assume user level is stored in AsyncStorage
      const userLevel = 1; // Replace this with AsyncStorage logic if needed
      router.push('/belajar');
    } catch (error) {
      Alert.alert('Error', 'Failed to retrieve level.');
    }
  };

  const logout = () => {
    // Implement logout logic (e.g., clearing token, redirecting to login)
    Alert.alert('Logout', 'You have been logged out.');
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {/* Sidebar Section */}
      <ScrollView style={styles.sidebarSection} contentContainerStyle={styles.sidebarContent}>
        <TouchableOpacity style={styles.sideLogo}>
          <Image source={require('../../assets/images/logo.png')} style={styles.navPic} />
          <Text style={styles.logoText}>CapyLingo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sideItem} onPress={redirectToLevelPage}>
          <Image source={require('../../assets/images/home.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Belajar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sideItem}>
          <Image source={require('../../assets/images/flashcard.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Vocabularies</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sideItem} onPress={logout}>
          <Image source={require('../../assets/images/out.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Keluar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Vocabs Section */}
      <ScrollView style={styles.vocabsSection}>
        <TouchableOpacity style={styles.vocabs} onPress={() => router.push('/fruits')}>
          <View style={styles.vocabsItem}>
            <Image source={require('../../assets/images/watermelon.png')} style={styles.vocabsImage} />
            <Text style={styles.vocabsText}>Fruits</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.vocabs} onPress={() => router.push('/vegetables')}>
          <View style={styles.vocabsItem}>
            <Image source={require('../../assets/images/eggplant.png')} style={styles.vocabsImage} />
            <Text style={styles.vocabsText}>Vegetables</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.vocabs} onPress={() => router.push('/activities')}>
          <View style={styles.vocabsItem}>
            <Image source={require('../../assets/images/eat.png')} style={styles.vocabsImage} />
            <Text style={styles.vocabsText}>Activities</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default VocabulariesPage;

/* ========== STYLES ========== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  sidebarSection: {
    width: '35%',
    backgroundColor: '#f5f5f5',
  },
  sidebarContent: {
    padding: 20,
  },
  sideLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  navPic: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
  },
  vocabsSection: {
    width: '65%',
    padding: 20,
  },
  vocabs: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  vocabsItem: {
    alignItems: 'center',
  },
  vocabsImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  vocabsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});