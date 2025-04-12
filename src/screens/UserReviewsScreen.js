import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const UserReviewsScreen = ({ route }) => {
  const { reviews } = route.params;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Example: "4/12/2025, 10:23 AM"
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Reviews</Text>
      {reviews.length === 0 ? (
        <Text style={styles.noReviewText}>No reviews found.</Text>
      ) : (
        reviews.map((review, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.bookTitle}>
              {review.book_title || 'Unknown Book'}
            </Text>
            <Text style={styles.reviewText}>{review.review_text}</Text>
            <View style={styles.metaBox}>
              <Text style={styles.timestamp}>
                Updated: {formatDate(review.updated_at)}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e2e2e',
    marginBottom: 25,
    textAlign: 'center',
  },
  noReviewText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  bookTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#3c3c3c',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
    lineHeight: 22,
    textAlign: 'justify',
  },
  metaBox: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 6,
    marginTop: 8,
  },
  timestamp: {
    fontSize: 13,
    color: '#999',
    textAlign: 'right',
  },
});

export default UserReviewsScreen;
