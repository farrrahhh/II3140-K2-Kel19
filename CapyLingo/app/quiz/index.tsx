import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

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

  const router = useRouter();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const level = await AsyncStorage.getItem('level');
        const token = await AsyncStorage.getItem('token');

        if (!level || !token) {
          Alert.alert('Error', 'Level or token not found. Redirecting to login.');
          router.replace('/login');
          return;
        }

        const response = await fetch(`https://capy-lingo-backend.vercel.app/api/quizzes?level=${level}`, {
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

    fetchQuizData();
  }, [router]);

  const handleAnswerPress = (answer: { text: string; correct: boolean }) => {
    setSelectedAnswer(answer.text);
    if (answer.correct) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextPress = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    } else {
      submitQuizResult();
    }
  };

  const submitQuizResult = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const quizId = await AsyncStorage.getItem('level');
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
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No questions available. Please try again later.</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bacalah dan jawab pertanyaannya!</Text>
      <Text style={styles.question}>{`${currentQuestionIndex + 1}. ${currentQuestion.question}`}</Text>
      <View style={styles.answerContainer}>
        {currentQuestion.answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswer === answer.text && (answer.correct ? styles.correct : styles.incorrect),
            ]}
            onPress={() => handleAnswerPress(answer)}
            disabled={selectedAnswer !== null}
          >
            <Text style={styles.answerText}>{answer.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.indicator}>{`${currentQuestionIndex + 1} of ${questions.length} Questions`}</Text>
        {selectedAnswer && (
          <Button title="Berikutnya" onPress={handleNextPress} color="#4CAF50" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  answerContainer: {
    marginBottom: 20,
  },
  answerButton: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  answerText: {
    fontSize: 16,
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  indicator: {
    marginBottom: 10,
    fontSize: 16,
  },
  correct: {
    backgroundColor: '#A5ED6E',
  },
  incorrect: {
    backgroundColor: '#FF4B4B',
  },
});

export default Quiz;