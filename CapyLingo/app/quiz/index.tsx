import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, SearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { useFonts } from 'expo-font';
import { useSearchParams } from 'expo-router/build/hooks';

interface Question {
  question: string;
  answers: { text: string; correct: boolean }[];
}

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const level_quiz = searchParams.get('level'); // Retrieve the quiz level from query parameters

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      fetchQuizData();
    }
  }, [fontsLoaded, level_quiz]);

  const fetchQuizData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!level_quiz || !token) {
        router.replace('/login');
        return;
      }

      const response = await fetch(
        `https://capy-lingo-backend.vercel.app/api/quizzes?level=${level_quiz}`,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        const formattedQuestions = result.Questions.map((q: any) => ({
          question: q.question,
          answers: [
            { text: q.option_a, correct: q.correct_option === 'A' },
            { text: q.option_b, correct: q.correct_option === 'B' },
            { text: q.option_c, correct: q.correct_option === 'C' },
            { text: q.option_d, correct: q.correct_option === 'D' },
          ],
        }));
        setQuestions(formattedQuestions);
      } else {
        router.replace('/belajar');
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      router.replace('/belajar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerPress = (answer: { text: string; correct: boolean }) => {
    setSelectedAnswer(answer.text);
    setIsCorrect(answer.correct);

    const correct = currentQuestion.answers.find((ans) => ans.correct);
    if (correct) {
      setCorrectAnswer(correct.text);
    }

    if (answer.correct) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextPress = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setCorrectAnswer(null);
    } else {
      setConfirmationModalVisible(true);
    }
  };

  const submitQuizResult = async () => {
    setConfirmationModalVisible(false);
    const userIdString = await AsyncStorage.getItem('userId');
    let userId: number | null = null;
    if (userIdString) {
      userId = parseInt(userIdString, 10);
    }
    const quizId = level_quiz;
    const token = await AsyncStorage.getItem('token');

    if (!userId || !quizId || !token) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://capy-lingo-backend.vercel.app/api/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          userId,
          quizId,
          score,
          totalQuestions: questions.length,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('level', result.newLevel.toString());
        await AsyncStorage.setItem('xp', result.xp.toString());
        router.replace('/belajar');
      }
    } catch (error) {
      console.error('Error submitting quiz result:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFB0B0" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Image
            source={require('../../assets/images/arrow.png')} 
            style={styles.backIcon} 
          />
        </TouchableOpacity>
        </View>

        <Text style={styles.title}>Bacalah dan jawab pertanyaannya!</Text>

        <View style={styles.content}>
          <Text style={styles.question}>
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </Text>
          <View style={styles.answerContainer}>
            {currentQuestion.answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerButton,
                  selectedAnswer === answer.text && (isCorrect ? styles.correct : styles.incorrect),
                ]}
                onPress={() => handleAnswerPress(answer)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.answerText}>{answer.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Progress.Bar
            progress={(currentQuestionIndex + 1) / questions.length}
            width={null}
            height={10}
            color="#FFB0B0"
            unfilledColor="#E5E5E5"
            borderWidth={0}
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1} of {questions.length} Questions
          </Text>
          {selectedAnswer && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex + 1 < questions.length ? 'CONTINUE' : 'FINISH'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Confirmation Modal */}
        <Modal
          transparent={true}
          visible={confirmationModalVisible}
          animationType="fade"
          onRequestClose={() => setConfirmationModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Are you sure?</Text>
              <Text style={styles.modalMessage}>Do you want to finish the quiz?</Text>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setConfirmationModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={submitQuizResult}
                >
                  <Text style={styles.modalButtonText}>Finish</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFB0B0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    textAlign: 'left',
    marginVertical: 20,
    color: '#000',
  },
  content: {
    flex: 1,
    marginTop: 50,
  },
  question: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    textAlign: 'left',
    color: '#000',
  },
  answerContainer: {
    marginBottom: 20,
  },
  answerButton: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#FFF8DC',
  },
  answerText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    textAlign: 'left',
  },
  correct: {
    backgroundColor: '#D7FFB8',
  },
  incorrect: {
    backgroundColor: '#FFDFE0',
  },
  footer: {
    padding: 16,
  },
  progressBar: {
    marginBottom: 10,
  },
  progressText: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#FFB0B0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
   
  },
  cancelButton: {
    backgroundColor: '#CCC',
  },
  confirmButton: {
    backgroundColor: '#FFB0B0',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  backIcon: {
    width: 24, // Adjust the size as needed
    height: 24, // Adjust the size as needed
    resizeMode: 'contain', // Ensure the image scales proportionally
  },
});

export default Quiz;