import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function PlantCard({ plant, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: plant.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.category}>{plant.category}</Text>
        <Text style={styles.name}>{plant.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

