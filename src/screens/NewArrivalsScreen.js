import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const NewArrivalsScreen = ({ navigation }) => {
  const newArrivals = [
    {
      title: 'Under the Same Stars', author: 'Jane Harper', rating: 4.2,
      image: 'https://m.media-amazon.com/images/I/81HcIAJnyQL._SL1500_.jpg',
      screen: 'UnderTheSameStarsDetails', id: 1
    },
    {
      title: 'The Heaven & Earth Grocery Store', author: 'James McBride', rating: 4.8,
      image: 'https://m.media-amazon.com/images/I/71gLNSLmIxL._SL1500_.jpg',
      screen: 'HeavenDetails', id: 2
    },
    {
      title: 'The Meadowbrook Murders', author: 'Jessica Goodman', rating: 4.6,
      image: 'https://m.media-amazon.com/images/I/71KJMVYP+7L._SL1500_.jpg',
      screen: 'MeadowbrookMurdersDetails', id: 3
    },
  ];

  return (
    <LinearGradient 
      colors={['#D7C49EFF', '#343148FF']} // New gradient colors
      start={{ x: 0.5, y: 0 }} 
      end={{ x: 0.5, y: 1.2 }}
      style={styles.gradient}
    >
      <FlatList
        data={newArrivals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(item.screen)}>
            <Image source={{ uri: item.image }} style={styles.bookImage} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.author}>by {item.author}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="gold" />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slight transparency
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookImage: {
    width: 60,
    height: 90,
    borderRadius: 5,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Darker contrast
  },
  author: {
    fontSize: 14,
    color: '#555', // Slightly dark gray
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222', // Dark text for readability
  },
});

export default NewArrivalsScreen;
