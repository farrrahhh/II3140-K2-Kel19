import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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

const ActivitiesVocabularyGame: React.FC = () => {
  const router = useRouter();

  // Words
  const [words, setWords] = useState<Word[]>([
    { id: 'word1', text: 'Throwing Trash Away', matched: false },
    { id: 'word2', text: 'Cycling', matched: false },
    { id: 'word3', text: 'Skipping Rope', matched: false },
  ]);

  // Definitions / Images
  const [definitions, setDefinitions] = useState<Definition[]>([
    { id: 'def1', word: 'Cycling', image: require('../../assets/images/cycling.png'), matched: false },
    { id: 'def2', word: 'Throwing Trash Away', image: require('../../assets/images/throwing-away-trash.png'), matched: false },
    { id: 'def3', word: 'Skipping Rope', image: require('../../assets/images/skipping-rope.png'), matched: false },
  ]);

  // The currently selected word
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

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

  /**
   * Go to a different page (e.g. your 'belajar' page)
   */
  const redirectToLevelPage = () => {
    router.replace('/belajar');
  };

  return (
    <View style={styles.container}>
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

export default ActivitiesVocabularyGame;

/* ========== STYLES ========== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb0b0',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  /* Header */
 
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  backButton: {
    marginRight: 10,
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
  /* Title */
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
    fontFamily: 'Poppins',
  },
  /* Words Container (Vertical Stack) */
  wordsContainer: {
    marginBottom: 30, // Add space before images section
    
  },
  wordBox: {
    backgroundColor: '#FFD09B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    
    marginBottom: 10, // Vertical spacing
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