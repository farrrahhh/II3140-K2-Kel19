import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, SearchParams } from 'expo-router'; // Gunakan useSearchParams
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
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

  const router = useRouter();
  const searchParams = useSearchParams();
  const level_quiz = searchParams.get('level'); // Ambil level quiz dari query parameter

  useEffect(() => {
    fetchQuizData();
  }, [level_quiz]); // Tambahkan level_quiz sebagai dependency

  const fetchQuizData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!level_quiz || !token) {
        Alert.alert('Error', 'Level quiz or token not found. Redirecting to login.');
        router.replace('/login');
        return;
      }

      const response = await fetch(`https://capy-lingo-backend.vercel.app/api/quizzes?level=${level_quiz}`, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

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
        Alert.alert('Error', result.message || 'Failed to load quiz data');
        router.replace('/belajar');
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      Alert.alert('Error', 'An error occurred while fetching quiz data. Please try again.');
      router.replace('/belajar');
    } finally {
      setIsLoading(false);
    }
  };
  const handleAnswerPress = (answer: { text: string; correct: boolean }) => {
    setSelectedAnswer(answer.text);
    setIsCorrect(answer.correct);
    if (answer.correct) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextPress = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      submitQuizResult();
    }
  };

  const submitQuizResult = async () => {
    const userIdString = await AsyncStorage.getItem('userId');
    let userId: number | null = null;
    if (userIdString) {
      userId = parseInt(userIdString, 10);
    }
    const quizId = level_quiz;
    const token = await AsyncStorage.getItem('token');

    if (!userId || !quizId || !token) {
      Alert.alert('Error', 'User or quiz not identified');
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
        Alert.alert('Quiz Complete', result.message, [
          { text: 'Go to Dashboard', onPress: () => router.replace('/belajar') },
        ]);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error submitting quiz result:', error);
      Alert.alert('Error', 'An error occurred while submitting the quiz result. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#58CC02" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No questions available. Please try again later.</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#FFF', '#E5E5E5']} style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1CB0F6" />
          </TouchableOpacity>
          <Progress.Bar
            progress={(currentQuestionIndex + 1) / questions.length}
            width={null}
            height={10}
            color="#58CC02"
            unfilledColor="#E5E5E5"
            borderWidth={0}
            style={styles.progressBar}
          />
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <Text style={styles.question}>{currentQuestion.question}</Text>
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
          {selectedAnswer && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextPress}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex + 1 < questions.length ? 'CONTINUE' : 'FINISH'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#58CC02',
  },
  errorText: {
    fontSize: 16,
    color: '#FF4B4B',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {
    padding: 8,
  },
  progressBar: {
    flex: 1,
    marginHorizontal: 16,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#4B4B4B',
  },
  answerContainer: {
    marginBottom: 24,
  },
  answerButton: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  answerText: {
    fontSize: 16,
    color: '#4B4B4B',
  },
  correct: {
    backgroundColor: '#D7FFB8',
    borderColor: '#58CC02',
  },
  incorrect: {
    backgroundColor: '#FFDFE0',
    borderColor: '#FF4B4B',
  },
  footer: {
    padding: 16,
  },
  nextButton: {
    backgroundColor: '#58CC02',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Quiz;