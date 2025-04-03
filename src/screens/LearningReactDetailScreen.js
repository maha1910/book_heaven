import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../supabaseConfig';

const learningReactCover = require('../../assets/learningReactCover.jpg');

const LearningReactDetailScreen = () => {
  const navigation = useNavigation();
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverageRating = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('book_reviews')
        .select('rating')
        .eq('book_name', 'Learning React');

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
        <Image source={learningReactCover} style={styles.bookCover} />
        
        <Text style={styles.title}>Learning React</Text>
        <Text style={styles.author}>Author: Alex Banks</Text>
        <Text style={styles.year}>📅 Published: 2020</Text>
        <Text style={styles.pages}>📖 Pages: 350</Text>

        <Text style={styles.sectionTitle}>📜 Summary:</Text>
        <Text style={styles.description}>
          *Learning React* is a hands-on guide for building modern web applications. The book covers React fundamentals,
          hooks, state management, and best practices for scalable applications.
        </Text>

        <Text style={styles.sectionTitle}>✨ Key Takeaways:</Text>
        <Text style={styles.description}>
          - Understand the React component lifecycle{"\n"}
          - Learn about React Hooks for state and effects{"\n"}
          - Manage global state efficiently with Context and Redux{"\n"}
          - Build performant and scalable React apps
        </Text>

        <Text style={styles.sectionTitle}>⭐ Average Rating:</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#FFD700" />
        ) : (
          <Text style={styles.rating}>{averageRating} / 5</Text>
        )}

        <View style={styles.buttonContainer}>
          <Button title="Back to Home" onPress={() => navigation.navigate('Home')} color="#007AFF" />
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
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#f5f5f5',
  },
  rating: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default LearningReactDetailScreen;
