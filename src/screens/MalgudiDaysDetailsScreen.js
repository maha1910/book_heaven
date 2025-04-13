import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../supabaseConfig';

const MalgudiDaysDetailsScreen = () => {
  const navigation = useNavigation();
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverageRating = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('book_reviews')
        .select('rating')
        .eq('book_name', 'Malgudi Days');

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
          source={{ uri: 'https://www.startergroup.in/image/cache/catalog/demo/novels/md_9788185986173-1000x1000h.jpg' }}
          style={styles.bookCover}
        />

        <Text style={styles.title}>Malgudi Days</Text>
        <Text style={styles.subtitle}>
          A collection of short stories set in the fictional South Indian town of Malgudi
        </Text>
        <Text style={styles.author}>Author: R.K. Narayan</Text>
        <Text style={styles.year}>📅 Published: 1943</Text>
        <Text style={styles.pages}>📖 Pages: 264</Text>

        <Text style={styles.sectionTitle}>📜 Summary:</Text>
        <Text style={styles.description}>
          *Malgudi Days* captures the essence of everyday Indian life through charming tales centered 
          around quirky characters and heartfelt moments, all set in the fictional town of Malgudi.
        </Text>

        <Text style={styles.sectionTitle}>✨ Key Takeaways:</Text>
        <Text style={styles.description}>
          • Life in small-town India is rich with character and humor.{"\n"}
          • Simple narratives can carry deep meaning.{"\n"}
          • Each story reflects a slice of life and human emotion.{"\n"}
          • Narayan’s storytelling makes the ordinary feel magical.
        </Text>

        <View style={styles.ratingRow}>
          <Text style={styles.sectionTitle}>⭐ Rating:</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#FFD700" />
          ) : (
            <Text style={styles.rating}>{averageRating} / 5</Text>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('BookReviews', { bookName: 'Malgudi Days' })}>
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
    marginBottom: 10,
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

export default MalgudiDaysDetailsScreen;
