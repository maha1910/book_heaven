import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, 
  TouchableOpacity, Image, FlatList, Animated 
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const [countdown, setCountdown] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1)); // Animation for the button

  const releaseDate = new Date('2025-05-18T00:00:00Z');

  const books = [
    { title: 'Atomic Habits', author: 'James Clear', rating: 4.5, image: 'https://m.media-amazon.com/images/I/81bGKUa1e0L.jpg' },
    { title: 'The Heaven & Earth Grocery Store', author: 'James McBride', rating: 4.8, image: 'https://m.media-amazon.com/images/I/71gLNSLmIxL.SL1500.jpg' },
    { title: 'Learning React', author: 'Alex Banks', rating: 5.0, image: 'https://m.media-amazon.com/images/I/51ad7GkEzNL.jpg' },
  ];

  const topReviews = [
    { title: 'Atomic Habits', author: 'James Clear', rating: 4.5, review: 'A great read for building better habits.', image: 'https://m.media-amazon.com/images/I/81bGKUa1e0L.jpg' },
    { title: 'The Heaven & Earth Grocery Store', author: 'James McBride', rating: 4.8, review: 'An extraordinary story of family and survival.', image: 'https://m.media-amazon.com/images/I/71gLNSLmIxL.SL1500.jpg' },
    { title: 'Learning React', author: 'Alex Banks', rating: 5.0, review: 'The best book to start learning React!', image: 'https://m.media-amazon.com/images/I/51ad7GkEzNL.jpg' },
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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Bounce animation for the notification button
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient 
          colors={['#91F1EF', '#FFD5E0']} // Purple to Blue gradient
          start={{ x: 0.5, y: 0 }}  
          end={{ x: 0.5, y: 0.7 }}  
          style={styles.gradient}
        >
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header Section */}
        <Text style={styles.header}>Discover Your Next Favorite Book</Text>

        {/* Future of AI Section */}
        <Animated.View style={[styles.upcomingReleases, { opacity: fadeAnim }]}>
          <Text style={styles.upcomingTitle}>🚀 Upcoming Release</Text>
          <Text style={styles.bookTitle}>Future of AI</Text>
          <Text>Author: Dr. Sarah Connor</Text>
          <Text>Release Date: May 18, 2025</Text>
          <Text style={styles.countdown}>⏳ {countdown}</Text>

          {/* Animated Notification Button */}
          <Animated.View style={[styles.notifyButton, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity>
              <Text style={styles.notifyText}>Get Notified</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        {/* Featured Books Section */}
        <Text style={styles.sectionTitle}>📚 Featured Books</Text>
        <FlatList
          horizontal
          data={books}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={styles.bookCard}>
              <Image source={{ uri: item.image }} style={styles.bookImage} />
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>by {item.author}</Text>
              <Text style={styles.bookRating}>⭐ {item.rating}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />

        {/* Top Reviews Section */}
        <Text style={styles.sectionTitle}>🌟 Top Reviews</Text>
        <FlatList
          horizontal
          data={topReviews}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={styles.bookCard}>
              <Image source={{ uri: item.image }} style={styles.bookImage} />
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>by {item.author}</Text>
              <Text style={styles.bookRating}>⭐ {item.rating}</Text>
              <Text style={styles.bookReview}>{item.review}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Featured')}>
            <MaterialIcons name="star" size={24} color="white" />
            <Text style={styles.buttonText}>Featured Books</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewArrivals')}>
            <MaterialIcons name="new-releases" size={24} color="white" />
            <Text style={styles.buttonText}>New Arrivals</Text>
          </TouchableOpacity>
        </View>

        {/* Extra Actions */}
        <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('AddReview')}>
          <Text style={styles.buttonOutlineText}>✍ Add Review</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('RecommendBooks')}>
          <Text style={styles.buttonOutlineText}>📖 Recommend Books</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Search')}>
        <Ionicons name="search" size={28} color="white" />
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContent: { padding: 20 },
  header: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#2C3E50', marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#2980B9' },
  upcomingReleases: { backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 5, marginBottom: 20 },
  upcomingTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  bookTitle: { fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
  countdown: { fontSize: 16, color: '#E74C3C', marginTop: 5 },
  notifyButton: { backgroundColor: '#27AE60', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  notifyText: { color: 'white', fontWeight: 'bold' },
  bookCard: { width: 150, backgroundColor: '#fff', borderRadius: 10, padding: 10, marginRight: 15, alignItems: 'center', elevation: 5 },
  bookImage: { width: 100, height: 150, borderRadius: 5, marginBottom: 10 },
  bookAuthor: { fontSize: 14, color: '#7F8C8D' },
  bookRating: { fontSize: 16, color: '#F39C12', marginTop: 5 },
  bookReview: { fontSize: 14, color: '#7F8C8D', marginTop: 5, textAlign: 'center' },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
  button: { flexDirection: 'row', backgroundColor: '#2980B9', padding: 10, borderRadius: 5, alignItems: 'center', width: '45%' },
  buttonText: { color: 'white', marginLeft: 10, fontWeight: 'bold' },
  buttonOutline: { backgroundColor: '#fff', borderColor: '#2980B9', borderWidth: 1, padding: 12, borderRadius: 5, marginVertical: 10, alignItems: 'center' },
  buttonOutlineText: { color: '#2980B9', fontWeight: 'bold' },
  fab: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#2980B9', width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
});

export default HomeScreen;
