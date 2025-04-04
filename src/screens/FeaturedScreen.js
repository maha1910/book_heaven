import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../supabaseConfig';  // Ensure this is correctly set up

const { width } = Dimensions.get('window');

const FeaturedScreen = ({ navigation }) => {
  const [bookRatings, setBookRatings] = useState({});
  const [sortedBooks, setSortedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const featuredBooks = [
    { 
      title: 'Atomic Habits', author: 'James Clear', 
      image: 'https://images-na.ssl-images-amazon.com/images/I/81bGKUa1e0L.jpg', 
      screen: 'AtomicHabitsDetails', id: 1
    },
    { 
      title: 'Under the Same Stars', author: 'Jane Harper', 
      image: 'https://m.media-amazon.com/images/I/81HcIAJnyQL._SL1500_.jpg', 
      screen: 'UnderTheSameStarsDetails', id: 2
    },
    { 
      title: 'The Heaven & Earth Grocery Store', author: 'James McBride', 
      image: 'https://m.media-amazon.com/images/I/71gLNSLmIxL._SL1500_.jpg', 
      screen: 'HeavenDetails', id: 3
    },
    { 
      title: 'Learning React', author: 'Alex Banks', 
      image: 'https://m.media-amazon.com/images/I/51ad7GkEzNL.jpg', 
      screen: 'LearningReactDetailScreen', id: 4
    },
  ];

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      const ratingsData = {};

      for (const book of featuredBooks) {
        const { data, error } = await supabase
          .from('book_reviews')
          .select('rating')
          .eq('book_name', book.title);

        if (error) {
          console.error(`Error fetching rating for ${book.title}:`, error);
          continue;
        }

        const totalRatings = data.length;
        const avgRating = totalRatings ? (data.reduce((acc, review) => acc + review.rating, 0) / totalRatings).toFixed(1) : 'No ratings';
        ratingsData[book.title] = avgRating === 'No ratings' ? 0 : parseFloat(avgRating);
      }

      setBookRatings(ratingsData);

      const sorted = [...featuredBooks].sort((a, b) => (ratingsData[b.title] || 0) - (ratingsData[a.title] || 0));
      setSortedBooks(sorted);

      setLoading(false);
    };

    fetchRatings();
  }, []);

  return (
    <LinearGradient 
      colors={['#D7C49EFF', '#343148FF']} 
      start={{ x: 0.5, y: 0 }} 
      end={{ x: 0.5, y: 1.2 }}
      style={styles.gradient}
    >
      {loading ? (
        <ActivityIndicator size="large" color="gold" style={styles.loader} />
      ) : (
        <FlatList
          data={sortedBooks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(item.screen)}>
              <Image source={{ uri: item.image }} style={styles.bookImage} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>by {item.author}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="gold" />
                  <Text style={styles.rating}>
                    {bookRatings[item.title] || 'No ratings'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookImage: {
    width: 60,
    height: 90,
    borderRadius: 5,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', 
  },
  author: {
    fontSize: 14,
    color: '#555', 
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222', 
  },
});

export default FeaturedScreen;