import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const Vocab: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.spacer} />

        <TouchableOpacity style={[styles.vocabCard, styles.cardFruits]} onPress={() => router.push('/fruits')}>
          <Image source={require('../../assets/images/watermelon.png')} style={styles.vocabImage} />
          <Text style={styles.vocabText}>Fruits</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.vocabCard, styles.cardVegetables]} onPress={() => router.push('/vegetables')}>
          <Image source={require('../../assets/images/eggplant.png')} style={styles.vocabImage} />
          <Text style={styles.vocabText}>Vegetables</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.vocabCard, styles.cardActivities]} onPress={() => router.push('/activities')}>
          <Image source={require('../../assets/images/eat.png')} style={styles.vocabImage} />
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
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
    marginTop: 40,
  },
  spacer: {
    height: 20, // Add space at the top
  },
  vocabCard: {
    width: '90%',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardFruits: {
    backgroundColor: '#ffd09b',
  },
  cardVegetables: {
    backgroundColor: '#ffb0b0',
  },
  cardActivities: {
    backgroundColor: '#FFF8D1',
  },
  vocabImage: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  vocabText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
});

