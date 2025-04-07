import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../supabaseConfig';

const { width } = Dimensions.get('window');

const NewArrivalsScreen = ({ navigation }) => {
  const [newArrivals, setNewArrivals] = useState([
    {
      id: 1,
      title: 'Malgudi Days',
      author: 'R.K.Narayan',
      image: 'https://www.startergroup.in/image/cache/catalog/demo/novels/md_9788185986173-1000x1000h.jpg',
      screen: 'MalgudiDaysDetailsScreen',
      rating: null,
    },
    {
      id: 2,
      title: 'Under the Same Stars',
      author: 'Jane Harper',
      image: 'https://m.media-amazon.com/images/I/81HcIAJnyQL._SL1500_.jpg',
      screen: 'UnderTheSameStarsDetails',
      rating: null,
    },
    {
      id: 3,
      title: 'The Heaven & Earth Grocery Store',
      author: 'James McBride',
      image: 'https://m.media-amazon.com/images/I/71gLNSLmIxL._SL1500_.jpg',
      screen: 'HeavenDetails',
      rating: null,
    },
    {
      id: 4,
      title: 'The Meadowbrook Murders',
      author: 'Jessica Goodman',
      image: 'https://m.media-amazon.com/images/I/71KJMVYP+7L._SL1500_.jpg',
      screen: 'MeadowbrookMurdersDetails',
      rating: null,
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      const updatedBooks = await Promise.all(
        newArrivals.map(async (book) => {
          const { data, error } = await supabase
            .from('book_reviews')
            .select('rating')
            .eq('book_name', book.title);

          if (error) {
            console.error(`Error fetching rating for ${book.title}:`, error);
            return { ...book, rating: 'N/A' };
          }

          const totalRatings = data.length;
          const sumRatings = data.reduce((acc, review) => acc + review.rating, 0);
          const avgRating = totalRatings ? (sumRatings / totalRatings).toFixed(1) : 'No ratings yet';
          return { ...book, rating: avgRating };
        })
      );

      setNewArrivals(updatedBooks);
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
        <ActivityIndicator size="large" color="gold" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={newArrivals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(item.screen)}>
              <Image source={{ uri: item.image }} style={styles.bookImage} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>by {item.author}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="gold" />
                  <Text style={styles.rating}>{item.rating}</Text>
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

export default NewArrivalsScreen;
