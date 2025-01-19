import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import FilterPills from '../components/FilterPills';
import PlantCard from '../components/PlantCard';
import Carousel from '../components/Carousel';
import { plants } from '../utils/PlantData';

export default function HomeScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlants = plants.filter(plant => {
    const matchesFilter = selectedFilter === 'All' || plant.category === selectedFilter;
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}></Text>
      </View>
      
      <SearchBar onSearch={setSearchTerm} />

      <Carousel />

      <FilterPills selected={selectedFilter} onSelect={setSelectedFilter} />

      <View style={styles.newPlantsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Plants</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>

        <View style={styles.plantsGrid}>
          {filteredPlants.map(plant => (
            <View key={plant.id} style={styles.cardWrapper}>
              <PlantCard
                plant={plant}
                onPress={() => navigation.navigate('PlantDetails', { plant })}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    paddingTop: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  newPlantsSection: {
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  viewAll: {
    color: '#4CAF50',
    fontSize: 16,
  },
  plantsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 15,
  },
});

