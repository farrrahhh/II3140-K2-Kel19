import React from 'react';
import { View, StyleSheet } from 'react-native';

const Navbar: React.FC = () => {
  return <View style={styles.navbar} />;
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default Navbar;