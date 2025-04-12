import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const UserRecommendationsScreen = ({ route }) => {
  const { recommendedBooks } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Recommendations</Text>
      {recommendedBooks.length === 0 ? (
        <Text>No recommendations found.</Text>
      ) : (
        recommendedBooks.map((book, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.bookTitle}>{book.book_title}</Text>
            <Text style={styles.reason}>{book.reason || 'No reason provided.'}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#e8f0fe',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2b2b2b',
  },
  reason: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default UserRecommendationsScreen;
