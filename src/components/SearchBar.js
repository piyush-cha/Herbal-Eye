import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

export default function SearchBar({ onSearch, onMicPress, onCameraPress }) {
  const [term, setTerm] = useState('');

  const handleSearch = (text) => {
    setTerm(text);
    onSearch && onSearch(text); // Trigger the search callback if provided
  };

  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={term}
        onChangeText={handleSearch}
        placeholder="Search plants..."
        placeholderTextColor="#888"
      />
      <TouchableOpacity onPress={onMicPress} style={styles.iconContainer}>
        <MaterialIcons name="mic" size={20} color="#888" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onCameraPress} style={styles.iconContainer}>
        <MaterialIcons name="camera-alt" size={20} color="#888" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  iconContainer: {
    marginLeft: 10,
  },
});
