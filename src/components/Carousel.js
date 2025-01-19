import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

export default function Carousel() {
  const cards = [
    {
      id: 1,
      name: '',
      image: 'https://www.keralatourpackages.agency/media/blogs/why-kerala-is-famous-for-ayurvedic-tourism-3.jpg',
    },
    {
      id: 2,
      name: '',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyuvCoHUQgbiXJY3u0fuBLoYiFxW1RoL-KB44QmtjKbNpO_dpxS52JhDCmZhn8j3t1d2k&usqp=CAU',
    },
    {
      id: 3,
      name: '',
      image: 'https://saatwika.in/wp-content/uploads/2020/12/shutterstock_697995811-1024x683.jpg.webp',
    },
  ];

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {cards.map((card) => (
        <View key={card.id} style={styles.card}>
          <Image source={{ uri: card.image }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{card.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  card: {
    width: width - 40,
    height: 180,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
});

