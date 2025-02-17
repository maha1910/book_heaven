import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const BookDetailsScreen = ({ route }) => {
  const { book } = route.params; // Access the book data passed from FeaturedScreen

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Image source={{ uri: book.image }} style={styles.bookImage} />
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>Author: {book.author}</Text>
        <Text style={styles.bookRating}>Rating: {book.rating} ⭐</Text>
        <Text style={styles.bookDescription}>
          This is a detailed description of the book. It could include a summary of the plot, the author's background, reviews, and more.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  container: {
    alignItems: 'center',
  },
  bookImage: {
    width: 150,
    height: 225,
    marginBottom: 15,
    borderRadius: 5,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookAuthor: {
    fontSize: 18,
    marginBottom: 5,
  },
  bookRating: {
    fontSize: 16,
    marginBottom: 10,
  },
  bookDescription: {
    fontSize: 16,
    color: '#555',
  },
});

export default BookDetailsScreen;
