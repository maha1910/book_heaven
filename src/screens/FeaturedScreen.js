import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const FeaturedScreen = ({ navigation }) => {
  const featuredBooks = [
    { title: 'Atomic Habits', author: 'James Clear', rating: 4.5, image: 'https://placeimg.com/100/150/tech' },
    { title: 'Under the Same Stars', author: 'Jane Harper', rating: 4.2, image: 'https://placeimg.com/100/150/nature' },
    { title: 'The Heaven & Earth Grocery Store', author: 'James McBride', rating: 4.8, image: 'https://placeimg.com/100/150/animals' },
    { title: 'Learning React', author: 'Alex Banks', rating: 5.0, image: 'https://placeimg.com/100/150/architecture' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.header}>Featured Books</Text>
      {featuredBooks.map((book, index) => (
        <View key={index} style={styles.bookContainer}>
          <Image source={{ uri: book.image }} style={styles.bookImage} />
          <View style={styles.bookDetails}>
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text>Author: {book.author}</Text>
            <Text>Rating: {book.rating} ⭐</Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate('BookDetails', { book })}
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
    elevation: 3, // Add shadow on Android
    shadowColor: '#000', // iOS shadow
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

export default FeaturedScreen;
