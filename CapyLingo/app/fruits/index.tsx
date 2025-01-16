import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font'; // Import expo-font

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

const FruitsVocabularyGame: React.FC = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false); // Font loading state

  // Words
  const [words, setWords] = useState<Word[]>([
    { id: 'word1', text: 'Apple', matched: false },
    { id: 'word2', text: 'Grape', matched: false },
    { id: 'word3', text: 'Banana', matched: false },
  ]);

  // Definitions / Images
  const [definitions, setDefinitions] = useState<Definition[]>([
    { id: 'def1', word: 'Apple', image: require('../../assets/images/2.png'), matched: false },
    { id: 'def2', word: 'Grape', image: require('../../assets/images/3.png'), matched: false },
    { id: 'def3', word: 'Banana', image: require('../../assets/images/4.png'), matched: false },
  ]);

  // The currently selected word
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  useEffect(() => {
    // Load fonts using expo-font
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };

    loadFonts();
  }, []);

  /**
   * Called when the user taps a word in the list
   */
  const handleWordPress = (word: Word) => {
    if (!word.matched) {
      setSelectedWord(word);
    }
  };

  /**
   * Called when the user taps a definition (image)
   */
  const handleDefinitionPress = (definition: Definition) => {
    if (selectedWord && !definition.matched) {
      // Check if they match
      if (selectedWord.text === definition.word) {
        // Mark both matched
        setWords((prevWords) =>
          prevWords.map((w) =>
            w.id === selectedWord.id ? { ...w, matched: true } : w
          )
        );
        setDefinitions((prevDefs) =>
          prevDefs.map((d) =>
            d.id === definition.id ? { ...d, matched: true } : d
          )
        );
      }
      // Reset the selection
      setSelectedWord(null);
    }
  };

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <View style={styles.container}>
      {/* Back Arrow Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Tap the word, then tap the picture!</Text>

      {/* Words Section (Vertical) */}
      <View style={styles.wordsContainer}>
        {words.map((word) => (
          <TouchableOpacity
            key={word.id}
            style={[
              styles.wordBox,
              word.matched ? styles.matchedBox : null,
              selectedWord?.id === word.id && !word.matched
                ? styles.selectedBox
                : null,
            ]}
            onPress={() => handleWordPress(word)}
          >
            <Text style={styles.wordText}>{word.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Images Section (Vertical) */}
      <View style={styles.definitionsContainer}>
        {definitions.map((def) => (
          <TouchableOpacity
            key={def.id}
            style={[
              styles.definitionBox,
              def.matched ? styles.matchedBox : null,
            ]}
            onPress={() => handleDefinitionPress(def)}
          >
            <Image
              source={def.image}
              style={styles.definitionImage}
              resizeMode="contain"
            />
            {def.matched && <Text style={styles.matchedWord}>{def.word}</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FruitsVocabularyGame;

/* ========== STYLES ========== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb0b0',
    paddingTop: 40,
    paddingHorizontal: 20,
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
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
  },
  definitionsContainer: {},
});