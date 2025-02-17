import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>Featured Books</Text>
      <View style={styles.featuredBooks}>
        <Image source={{uri: 'https://placeimg.com/100/150/tech'}} style={styles.bookImage} />
        <Text>Title: Popular Book</Text>
        <Text>Author: Author Name</Text>
        <Text>Rating: 4.5</Text>
      </View>

      <Text style={styles.sectionHeader}>Book Search</Text>
      <TextInput style={styles.searchInput} placeholder="Search books..." />

      <Text style={styles.sectionHeader}>New Arrivals</Text>
      <View style={styles.newArrivals}>
        <Text>New Book Title</Text>
        <Text>Short description of the book...</Text>
      </View>

      <Text style={styles.sectionHeader}>Top Reviews</Text>
      <View style={styles.topReviews}>
        <Text>User Review: This book is amazing!</Text>
        <Text>Rating: 5</Text>
      </View>

      <Text style={styles.sectionHeader}>Recommended for You</Text>
      <View style={styles.recommendedBooks}>
        <Text>Book Title: Recommendation</Text>
        <Text>Author: Recommended Author</Text>
      </View>

      <Text style={styles.sectionHeader}>Categories</Text>
      <View style={styles.categories}>
        <Text>Fiction</Text>
        <Text>Non-Fiction</Text>
        <Text>Fantasy</Text>
      </View>

      <View style={styles.footer}>
        <Text>Privacy Policy | Terms of Service</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  featuredBooks: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
  },
  bookImage: {
    width: 100,
    height: 150,
    marginBottom: 10,
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  newArrivals: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
  },
  topReviews: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
  },
  recommendedBooks: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
  },
  categories: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
  },
  footer: {
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    width: '100%',
  },
});

export default HomeScreen;
