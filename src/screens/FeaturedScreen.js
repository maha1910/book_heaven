import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const FeaturedScreen = ({ navigation }) => {
  const featuredBooks = [
    { 
      title: 'Atomic Habits', author: 'James Clear', rating: 4.5, 
      image: 'https://images-na.ssl-images-amazon.com/images/I/81bGKUa1e0L.jpg', 
      screen: 'AtomicHabitsDetails', id: 1
    },
    { 
      title: 'Under the Same Stars', author: 'Jane Harper', rating: 4.2, 
      image: 'https://m.media-amazon.com/images/I/81HcIAJnyQL._SL1500_.jpg', 
      screen: 'UnderTheSameStarsDetails', id: 2
    },
    { 
      title: 'The Heaven & Earth Grocery Store', author: 'James McBride', rating: 4.8, 
      image: 'https://m.media-amazon.com/images/I/71gLNSLmIxL._SL1500_.jpg', 
      screen: 'HeavenDetails', id: 3
    },
    { 
      title: 'Learning React', author: 'Alex Banks', rating: 5.0, 
      image: 'https://m.media-amazon.com/images/I/51ad7GkEzNL.jpg', 
      screen: 'LearningReactDetailScreen', id: 4 // ✅ Fixed screen name
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={featuredBooks}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
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
  },
  author: {
    fontSize: 14,
    color: 'gray',
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
  },
});

export default FeaturedScreen;
