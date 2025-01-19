import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import { useTheme } from '../components/ThemeContext';

const Plants = ({ navigation }) => {
  const { isDarkMode } = useTheme();

  const plants = [
    { id: 1, name: 'Aloe Vera', image: require('../assets/aloe-vera.jpg') },
    { id: 2, name: 'Tulsi', image: require('../assets/tulsi.jpg') },
    { id: 3, name: 'Neem', image: require('../assets/neem.jpg') },
  ];

  const renderPlantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.plantItem}
      onPress={() => navigation.navigate('PlantDetail', { plantId: item.id })}
    >
      <Image source={item.image} style={styles.plantImage} />
      <Text style={[styles.plantName, isDarkMode && styles.darkText]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>Popular Plants</Text>
      <FlatList
        data={plants}
        renderItem={renderPlantItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  plantItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  plantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  plantName: {
    marginTop: 5,
    fontSize: 14,
  },
  darkText: {
    color: '#fff',
  },
});

export default Plants;

