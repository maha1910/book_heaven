import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [countdown, setCountdown] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showFeatured, setShowFeatured] = useState(false);
  const [showNewArrivals, setShowNewArrivals] = useState(false);

  const releaseDate = new Date('2025-03-15T00:00:00Z');

  const books = [
    { title: 'Atomic Habits', author: 'James Clear', rating: 4.5 },
    { title: 'Under the Same Stars', author: 'Jane Harper', rating: 4.2 },
    { title: 'The Heaven & Earth Grocery Store', author: 'James McBride', rating: 4.8 },
    { title: 'The Great Adventure', author: 'Mark Twain', rating: 4.0 },
    { title: 'Learning React', author: 'Alex Banks', rating: 5.0 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = releaseDate - now;
      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        setCountdown(`${days} days left`);
      } else {
        setCountdown('Released!');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddReview = () => {
    // Navigate to Add Review screen (or open a modal)
    navigation.navigate('AddReview');
  };

  const handleRecommendBooks = () => {
    // Navigate to Recommend Books screen (or open a modal)
    navigation.navigate('RecommendBooks');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Featured')}>
        <Text style={styles.buttonText}>Go to Featured Books</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search')}>
        <Text style={styles.buttonText}>Go to Search</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewArrivals')}>
        <Text style={styles.buttonText}>Go to New Arrivals</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAddReview}>
        <Text style={styles.buttonText}>Add Review</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRecommendBooks}>
        <Text style={styles.buttonText}>Recommend Books</Text>
      </TouchableOpacity>

      <View style={styles.upcomingReleases}>
        <Text style={styles.bookTitle}>Book: Future of AI</Text>
        <Text>Author: Dr. Sarah Connor</Text>
        <Text>Release Date: March 15, 2025</Text>
        <Text style={styles.countdown}>Countdown: {countdown}</Text>
        <TouchableOpacity style={styles.notifyButton}>
          <Text style={styles.notifyText}>Get Notified</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  upcomingReleases: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  countdown: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  notifyButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  notifyText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
