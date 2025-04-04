import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../supabaseConfig';

// Ensure correct image path
const heavenAndEarthCover = require('../../assets/heaven-and-earth-cover.jpg');

const HeavenDetailsScreen = () => {
  const navigation = useNavigation();
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverageRating = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('book_reviews')
        .select('rating')
        .eq('book_name', 'The Heaven & Earth Grocery Store');

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
      colors={['#F2AA4CFF', '#101820FF']}  // Smooth contrast for elegance
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.7 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={heavenAndEarthCover} style={styles.bookCover} />
        
        <Text style={styles.title}>The Heaven & Earth Grocery Store</Text>
        <Text style={styles.author}>Author: James McBride</Text>
        <Text style={styles.year}>📅 Published: 2023</Text>
        <Text style={styles.pages}>📖 Pages: 400</Text>

        <Text style={styles.sectionTitle}>📜 Summary:</Text>
        <Text style={styles.description}>
          *The Heaven & Earth Grocery Store* is a compelling novel about a small, diverse community in Pottstown,
          Pennsylvania. Through rich storytelling, McBride explores themes of love, belonging, and the struggles of
          marginalized people, all centered around a dilapidated grocery store that holds generations of history.
        </Text>

        <Text style={styles.sectionTitle}>✨ Key Themes:</Text>
        <Text style={styles.description}>
          - Community and Belonging{"\n"}
          - Love and Struggles{"\n"}
          - Historical and Social Reflections
        </Text>

        <Text style={styles.sectionTitle}>⭐ Rating:</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#FFD700" />
        ) : (
          <Text style={styles.rating}>{averageRating} / 5</Text>
        )}

        {/* Back to Home Button */}
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

export default HeavenDetailsScreen;
