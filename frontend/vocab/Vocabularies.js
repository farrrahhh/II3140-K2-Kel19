// screens/VocabulariesScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Sidebar from '../components/Sidebar';
import { useNavigation } from '@react-navigation/native';

const VocabulariesScreen = () => {
  const navigation = useNavigation();

  const navigateToCategory = (category) => {
    switch (category) {
      case 'Fruits':
        navigation.navigate('Fruits');
        break;
      case 'Vegetables':
        navigation.navigate('Vegetables');
        break;
      case 'Activities':
        navigation.navigate('Activities');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Sidebar />
      <ScrollView contentContainerStyle={styles.vocabsSection}>
        <TouchableOpacity style={styles.vocabs} onPress={() => navigateToCategory('Fruits')}>
          <View style={styles.vocabsItem}>
            <Image source={require('../assets/images/watermelon.png')} style={styles.vocabImage} />
            <Text style={styles.vocabText}>Fruits</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.vocabs} onPress={() => navigateToCategory('Vegetables')}>
          <View style={styles.vocabsItem}>
            <Image source={require('../assets/images/eggplant.png')} style={styles.vocabImage} />
            <Text style={styles.vocabText}>Vegetables</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.vocabs} onPress={() => navigateToCategory('Activities')}>
          <View style={styles.vocabsItem}>
            <Image source={require('../assets/images/eat.png')} style={styles.vocabImage} />
            <Text style={styles.vocabText}>Activities</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  vocabsSection: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  vocabs: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  vocabsItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vocabImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  vocabText: {
    fontSize: 20,
    color: '#333',
  },
});

export default VocabulariesScreen;