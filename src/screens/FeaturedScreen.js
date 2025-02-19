import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AtomicHabitsDetailsScreen from './AtomicHabitsDetailsScreen';
import UnderTheSameStarsDetailsScreen from './UnderTheSameStarsDetailsScreen';
import HeavenDetailsScreen from './HeavenDetailsScreen';
import LearningReactDetailScreen from './LearningReactDetailScreen';

const FeaturedScreen = ({ navigation }) => {
  // Array of featured books
  const featuredBooks = [
    { title: 'Atomic Habits', author: 'James Clear', rating: 4.5, image: 'https://placeimg.com/100/150/tech', id: 1 },
    { title: 'Under the Same Stars', author: 'Jane Harper', rating: 4.2, image: 'https://placeimg.com/100/150/nature', id: 2 },
    { title: 'The Heaven & Earth Grocery Store', author: 'James McBride', rating: 4.8, image: 'https://placeimg.com/100/150/animals', id: 3 },
    { title: 'Learning React', author: 'Alex Banks', rating: 5.0, image: 'https://placeimg.com/100/150/architecture', id: 4 },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.header}>Featured Books</Text>
      {featuredBooks.map((book) => (
        <View key={book.id} style={styles.bookContainer}>
          <Image source={{ uri: book.image }} style={styles.bookImage} />
          <View style={styles.bookDetails}>
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text>Author: {book.author}</Text>
            <Text>Rating: {book.rating} ⭐</Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => {
                switch (book.id) {
                  case 1:
                    navigation.navigate('AtomicHabitsDetailsScreen');
                    break;
                  case 2:
                    navigation.navigate('UnderTheSameStarsDetailsScreen');
                    break;
                  case 3:
                    navigation.navigate('HeavenDetailsScreen');
                    break;
                  case 4:
                    navigation.navigate('LearningReactDetailScreen');
                    break;
                  default:
                    break;
                }
              }}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bookContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  bookImage: {
    width: 100,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
  },
  bookDetails: {
    justifyContent: 'center',
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  detailsButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Featured" component={FeaturedScreen} />
        <Stack.Screen name="AtomicHabitsDetailsScreen" component={AtomicHabitsDetailsScreen} />
        <Stack.Screen name="UnderTheSameStarsDetailsScreen" component={UnderTheSameStarsDetailsScreen} />
        <Stack.Screen name="HeavenDetailsScreen" component={HeavenDetailsScreen} />
        <Stack.Screen name="LearningReactDetailScreen" component={LearningReactDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default FeaturedScreen;
