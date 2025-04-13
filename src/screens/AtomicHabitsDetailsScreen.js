import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../supabaseConfig';

const AtomicHabitsDetailsScreen = () => {
  const navigation = useNavigation();
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverageRating = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('book_reviews')
        .select('rating')
        .eq('book_name', 'Atomic Habits');

      if (error) {
        console.error('Error fetching average rating:', error);
        setLoading(false);
        return;
      }

      const totalRatings = data.length;
      const sumRatings = data.reduce((acc, review) => acc + review.rating, 0);
      const avgRating = totalRatings ? (sumRatings / totalRatings).toFixed(1) : 'No ratings yet';

      setAverageRating(avgRating);
      setLoading(false);
    };

    fetchAverageRating();
  }, []);

  return (
    <LinearGradient
      colors={['#F2AA4CFF', '#101820FF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.7 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/81bGKUa1e0L.jpg' }}
          style={styles.bookCover}
        />

        <Text style={styles.title}>Atomic Habits</Text>
        <Text style={styles.subtitle}>
          An Easy & Proven Way to Build Good Habits & Break Bad Ones
        </Text>
        <Text style={styles.author}>Author: James Clear</Text>
        <Text style={styles.year}>📅 Published: 2018</Text>
        <Text style={styles.pages}>📖 Pages: 320</Text>

        <Text style={styles.sectionTitle}>📜 Summary:</Text>
        <Text style={styles.description}>
          "Atomic Habits" focuses on building good habits, breaking bad ones, and making small,
          consistent changes that lead to remarkable results over time.
        </Text>

        <Text style={styles.sectionTitle}>✨ Key Takeaways:</Text>
        <Text style={styles.description}>
          • Small changes, compounded over time, lead to big results.{"\n"}
          • Focus on identity-based habits.{"\n"}
          • The four-step framework for behavior change: Cue, Craving, Response, Reward.{"\n"}
          • Make habits easy, attractive, and satisfying.
        </Text>

        <View style={styles.ratingRow}>
          <Text style={styles.sectionTitle}>⭐ Rating:</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#FFD700" />
          ) : (
            <Text style={styles.rating}>{averageRating} / 5</Text>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('BookReviews', { bookName: 'Atomic Habits' })}>
            <Text style={styles.seeReviews}>See Reviews</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.homeButton}>
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 15,
  },
  bookCover: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: '#f5f5f5',
    textAlign: 'center',
  },
  year: {
    fontSize: 16,
    color: '#f5f5f5',
    textAlign: 'center',
  },
  pages: {
    fontSize: 16,
    color: '#f5f5f5',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#f5f5f5',
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  seeReviews: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00CED1',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  homeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AtomicHabitsDetailsScreen;
