import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';

export default function ProfileScreen() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://placeholder.svg?height=100&width=100' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Feather name="user" size={24} color="#666" />
          <Text style={styles.menuText}>Edit Profile</Text>
          <Feather name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="bell" size={24} color="#666" />
          <Text style={styles.menuText}>Notifications</Text>
          <Feather name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={toggleTheme}>
          <Feather name={isDarkMode ? "sun" : "moon"} size={24} color="#666" />
          <Text style={styles.menuText}>Dark Mode</Text>
          <View style={styles.toggle}>
            <View style={[styles.toggleDot, isDarkMode && styles.toggleDotActive]} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    padding: 2,
  },
  toggleDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#666',
  },
  toggleDotActive: {
    transform: [{ translateX: 20 }],
    backgroundColor: '#4CAF50',
  },
});

