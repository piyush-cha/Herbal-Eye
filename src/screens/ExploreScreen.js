import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import FilterPills from '../components/FilterPills';
import PlantCard from '../components/PlantCard';
import { plants } from '../utils/PlantData';

export default function ExploreScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  const filteredPlants = plants.filter(plant => {
    const matchesFilter = selectedFilter === 'All' || plant.category === selectedFilter;
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Custom Tab Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}></Text>
      </View>

      {/* Filter Pills */}
      <View style={styles.filterContainer}>
        <FilterPills selected={selectedFilter} onSelect={setSelectedFilter} />
      </View>

      {/* Plant List */}
      <FlatList
        data={filteredPlants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlantCard
            plant={item}
            onPress={() => navigation.navigate('PlantDetails', { plant: item })}
          />
        )}
        contentContainerStyle={styles.plantsList}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>
            No plants found. Try a different filter or search term.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  filterContainer: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows filters to wrap if there are too many
    justifyContent: 'space-between', // Ensures proper spacing
  },
  plantsList: {
    padding: 15,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
