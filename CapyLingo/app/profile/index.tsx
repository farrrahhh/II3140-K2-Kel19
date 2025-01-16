
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Profile = () => {
  const [username, setUsername] = useState<string>('User');
  const [level, setLevel] = useState<number>(1);
  const [streak, setStreak] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedLevel = await AsyncStorage.getItem('level');
      const storedStreak = await AsyncStorage.getItem('day_streak');
      const storedXp = await AsyncStorage.getItem('xp');

      if (storedUsername) setUsername(storedUsername);
      if (storedLevel) setLevel(parseInt(storedLevel, 10));
      if (storedStreak) setStreak(parseInt(storedStreak, 10));
      if (storedXp) setXp(parseInt(storedXp, 10));
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword) {
      alert('Error: All fields are required.');
      return;
    }

    if (oldPassword === newPassword) {
      alert('Error: New password cannot be the same as old password.');
      return;
    }

    try {
      const response = await fetch(
        'https://capy-lingo-backend.vercel.app/api/change-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, oldPassword, newPassword }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert('Password changed successfully!');
        setModalVisible(false);
        setOldPassword('');
        setNewPassword('');
      } else {
        alert(result.message || 'Failed to change password.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      router.replace('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          <View style={styles.profileInfo}>
            <Image
              source={require('../../assets/images/avatar.png')}
              style={styles.avatar}
            />
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.level}>Level {level}</Text>
          </View>

          <View style={styles.statsContainer}>
          <View style={styles.statItem}>
              <Image 
                source={require('../../assets/images/flame.png')} 
                style={styles.flameImage} 
              />
              <Text style={styles.statValue}>{streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Image 
                source={require('../../assets/images/starpict.png')} 
                style={styles.starImage} 
              />
              <Text style={styles.statValue}>{xp}</Text>
              <Text style={styles.statLabel}>Total XP</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Image 
              source={require('../../assets/images/lock1.png')} 
              style={styles.lockIcon} 
            />
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setLogoutModalVisible(true)}
          >
            <Image 
              source={require('../../assets/images/out1.png')} 
              style={styles.logoutIcon} 
            />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Change Password Modal */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Change Password</Text>

              <TextInput
                placeholder="Old Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry
                style={styles.input}
              />
              <TextInput
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                style={styles.input}
              />

              <TouchableOpacity
                style={styles.modalButton}
                onPress={handlePasswordChange}
              >
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Logout Confirmation Modal */}
        <Modal
          visible={logoutModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setLogoutModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Confirm Logout</Text>
              <Text style={styles.modalText}>Are you sure you want to logout?</Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleLogout}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flameImage: {
    width: 24,
    height: 24,
    marginBottom: 5, 
  },
  starImage: {
    width: 24, 
    height: 24, 
    marginBottom: 5,
  },
  lockIcon: {
    width: 20, 
    height: 20, 
    marginRight: 8, 
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  logoutIcon: {
    width: 20, 
    height: 20, 
    marginRight: 8, 
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
  },
  level: {
    fontSize: 18,
    color: '#666',
    fontFamily: 'Poppins-Medium',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFB0B0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 16,
    width: '80%',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    width: '80%',
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  modal: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontFamily: 'Poppins-Regular',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#FFB0B0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
  },
  modalButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins-Medium',
  },
});

export default Profile;