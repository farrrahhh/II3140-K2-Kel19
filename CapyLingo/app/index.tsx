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
    Alert.alert('Logout', 'You have been logged out.');
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
      </View>

      {/* Title */}
      <Text style={styles.title}>Choose a category:</Text>

      {/* Vocabs Section */}
      <ScrollView contentContainerStyle={styles.vocabsContainer}>
        <TouchableOpacity
          style={styles.vocabs}
          onPress={() => router.push('/fruits')}
        >
          <View style={styles.vocabsItem}>
            <Image
              source={require('../assets/images/watermelon.png')}
              style={styles.vocabsImage}
            />
            <Text style={styles.vocabsText}>Fruits</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.vocabs}
          onPress={() => router.push('/vegetables')}
        >
          <View style={styles.vocabsItem}>
            <Image
              source={require('../assets/images/eggplant.png')}
              style={styles.vocabsImage}
            />
            <Text style={styles.vocabsText}>Vegetables</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.vocabs}
          onPress={() => router.push('/activities')}
        >
          <View style={styles.vocabsItem}>
            <Image
              source={require('../assets/images/eat.png')}
              style={styles.vocabsImage}
            />
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
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  logo: {
    width: 40,
    height: 40,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins',
  },
  vocabsContainer: {
    alignItems: 'center',
  },
  vocabs: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  vocabsItem: {
    alignItems: 'center',
  },
  vocabsImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  vocabsText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
});