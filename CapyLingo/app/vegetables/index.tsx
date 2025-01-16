import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font'; // Import expo-font for font loading

interface Word {
  id: string;
  text: string;
  matched: boolean;
}

interface Definition {
  id: string;
  word: string;
  image: any;
  matched: boolean;
}

const VegetablesVocabularyGame: React.FC = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false); // Font loading state

  // Words
  const [words, setWords] = useState<Word[]>([
    { id: 'word1', text: 'Spinach', matched: false },
    { id: 'word2', text: 'Celery', matched: false },
    { id: 'word3', text: 'Bell Pepper', matched: false },
  ]);

  // Definitions / Images
  const [definitions, setDefinitions] = useState<Definition[]>([
    { id: 'def1', word: 'Bell Pepper', image: require('../../assets/images/bellpaper.png'), matched: false },
    { id: 'def2', word: 'Spinach', image: require('../../assets/images/spinach.png'), matched: false },
    { id: 'def3', word: 'Celery', image: require('../../assets/images/celery.png'), matched: false },
  ]);

  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  useEffect(() => {
    // Load custom fonts using expo-font
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };

    loadFonts();
  }, []);

  const handleWordPress = (word: Word) => {
    if (!word.matched) {
      setSelectedWord(word);
    }
  };

  const handleDefinitionPress = (definition: Definition) => {
    if (selectedWord && !definition.matched) {
      if (selectedWord.text === definition.word) {
        setWords((prevWords) =>
          prevWords.map((w) => (w.id === selectedWord.id ? { ...w, matched: true } : w))
        );
        setDefinitions((prevDefs) =>
          prevDefs.map((d) => (d.id === definition.id ? { ...d, matched: true } : d))
        );
      }
      setSelectedWord(null);
    }
  };

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Image 
            source={require('../../assets/images/arrow.png')} 
            style={styles.arrowIcon} 
          />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Tap the word, then tap the picture!</Text>

      {/* Words Section */}
      <View style={styles.wordsContainer}>
        {words.map((word) => (
          <TouchableOpacity
            key={word.id}
            style={[
              styles.wordBox,
              word.matched ? styles.matchedBox : null,
              selectedWord?.id === word.id && !word.matched ? styles.selectedBox : null,
            ]}
            onPress={() => handleWordPress(word)}
          >
            <Text style={styles.wordText}>{word.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Images Section */}
      <View style={styles.definitionsContainer}>
        {definitions.map((def) => (
          <TouchableOpacity
            key={def.id}
            style={[styles.definitionBox, def.matched ? styles.matchedBox : null]}
            onPress={() => handleDefinitionPress(def)}
          >
            <Image source={def.image} style={styles.definitionImage} resizeMode="contain" />
            {def.matched && <Text style={styles.matchedWord}>{def.word}</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default VegetablesVocabularyGame;

/* ========== STYLES ========== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb0b0',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  arrowIcon: {
    width: 24, 
    height: 24, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
    fontFamily: 'Poppins-Bold', // Updated font family
  },
  wordsContainer: {
    marginBottom: 30,
  },
  wordBox: {
    backgroundColor: '#FFD09B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  wordText: {
    fontSize: 18,
    fontFamily: 'Poppins', // Updated font family
  },
  selectedBox: {
    borderRadius: 8,
    backgroundColor: '#FFAB4D',
  },
  matchedBox: {
    backgroundColor: '#AAF0AA',
  },
  definitionBox: {
    backgroundColor: '#FFF8D1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  definitionImage: {
    width: 80,
    height: 80,
  },
  matchedWord: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#008000',
    fontFamily: 'Poppins', // Updated font family
  },
  definitionsContainer: {},
});