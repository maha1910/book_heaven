import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { supabase } from '../../supabaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

const UserReviewsScreen = ({ navigation }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchUserReviews();
  }, []);

  const fetchUserReviews = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      Alert.alert('Error', 'Failed to fetch user data. Please login again.');
      navigation.replace('Login');
      return;
    }

    const userId = user.id;

    const { data: userReviews, error: reviewError } = await supabase
      .from('book_reviews')
      .select('*')
      .eq('user_id', userId);

    if (reviewError) {
      console.error('Review Fetch Error:', reviewError);
    } else {
      setReviews(userReviews || []);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Unknown' : date.toLocaleDateString();
  };

  return (
    <LinearGradient
      colors={['#a18cd1', '#fbc2eb']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📚 Your Book Reviews</Text>

        {reviews.length === 0 ? (
          <View style={styles.noReviewContainer}>
            <Text style={styles.noReviewText}>You haven’t written any reviews yet.</Text>
          </View>
        ) : (
          reviews.map((review, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.bookTitle}>
                {review.book_name?.trim() || 'Untitled Book'}
              </Text>
              <Text style={styles.reviewText}>
                {review.review_text || 'No review text available.'}
              </Text>
              <View style={styles.metaBox}>
                <Text style={styles.timestamp}>
                  🕒 Last updated: {formatDate(review.updated_at)}
                </Text>
              </View>
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
    paddingBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  noReviewContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  noReviewText: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    borderLeftWidth: 6,
    borderLeftColor: '#583c97',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 14,
    lineHeight: 22,
    textAlign: 'justify',
  },
  metaBox: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 6,
  },
  timestamp: {
    fontSize: 13,
    color: '#999',
    textAlign: 'right',
  },
});

export default UserReviewsScreen;
