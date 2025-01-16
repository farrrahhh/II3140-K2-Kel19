import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const Vocab: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Space at the top */}
        <View style={styles.spacer} />

        {/* Fruits Card */}
        <TouchableOpacity
          style={[styles.vocabCard, styles.cardFruits]}
          onPress={() => router.push('/fruits' as any)}
        >
          <Image
            source={require('../../assets/images/watermelon.png')}
            style={styles.vocabImage}
          />
          <Text style={styles.vocabText}>Fruits</Text>
        </TouchableOpacity>

        {/* Vegetables Card */}
        <TouchableOpacity
          style={[styles.vocabCard, styles.cardVegetables]}
          onPress={() => router.push('/vegetables' as any)}
        >
          <Image
            source={require('../../assets/images/eggplant.png')}
            style={styles.vocabImage}
          />
          <Text style={styles.vocabText}>Vegetables</Text>
        </TouchableOpacity>

        {/* Activities Card */}
        <TouchableOpacity
          style={[styles.vocabCard, styles.cardActivities]}
          onPress={() => router.push('/activities' as any)}
        >
          <Image
            source={require('../../assets/images/eat.png')}
            style={styles.vocabImage}
          />
          <Text style={styles.vocabText}>Activities</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Vocab;

/* ========== STYLES ========== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Ensure the background is consistent
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
    marginTop: 50,
  },
  spacer: {
    height: 20, // Add space at the top
  },
  vocabCard: {
    width: '90%',
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    maxWidth: 600,
  },
  cardFruits: {
    backgroundColor: '#FFD09B', // Light orange for Fruits
  },
  cardVegetables: {
    backgroundColor: '#FFB0B0', // Light pink for Vegetables
  },
  cardActivities: {
    backgroundColor: '#FFF8D1', // Light yellow for Activities
  },
  vocabImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain', // Ensure images fit inside the container
  },
  vocabText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    color: '#333', // Darker text for readability
  },
});