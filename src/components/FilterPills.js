import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function FilterPills({ selected, onSelect }) {
  const filters = ['All', 'Root', 'Tree', 'Herb'];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.pill,
            selected === filter && styles.selectedPill
          ]}
          onPress={() => onSelect(filter)}
        >
          <Text style={[
            styles.pillText,
            selected === filter && styles.selectedPillText
          ]}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    marginRight: 10,
  },
  selectedPill: {
    backgroundColor: '#4CAF50',
  },
  pillText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  selectedPillText: {
    color: 'white',
  },
});

