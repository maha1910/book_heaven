// screens/BookReviewsScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../supabaseConfig';

const BookReviewsScreen = ({ route }) => {
  const { bookName } = route.params;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('book_reviews')
        .select('*')
        .eq('book_name', bookName)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
      } else {
        setReviews(data);
      }

      setLoading(false);
    };

    fetchReviews();
  }, [bookName]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <LinearGradient
      colors={['#A770EF', '#FDB99B']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Reviews for "{bookName}"</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : reviews.length === 0 ? (
          <Text style={styles.noReview}>No reviews found for this book.</Text>
        ) : (
          reviews.map((review, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.reviewText}>{review.review_text}</Text>
              <Text style={styles.meta}>
                ⭐ {review.rating} / 5 | 🗓 {formatDate(review.updated_at)}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffffcc',
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#6c47ff',
  },
  reviewText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  meta: {
    fontSize: 13,
    color: '#666',
    textAlign: 'right',
  },
  noReview: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default BookReviewsScreen;
