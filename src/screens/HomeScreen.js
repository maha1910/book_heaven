import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, 
  TouchableOpacity, Image, FlatList, Animated 
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from "expo-location";
import { ActivityIndicator } from 'react-native';
import { Linking } from 'react-native';
import { supabase } from '../../supabaseConfig';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const [countdown, setCountdown] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1)); // Animation for the button
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const [notification, setNotification] = useState(null);

const handleNotification = () => {
  setNotification('🔔 You will be notified when the book is released!');
  setTimeout(() => setNotification(null), 3000);
};


  const releaseDate = new Date('2025-05-18T00:00:00Z');

  const books = [
    { 
      title: 'Atomic Habits', author: 'James Clear', 
      image: 'https://images-na.ssl-images-amazon.com/images/I/81bGKUa1e0L.jpg', 
      screen: 'AtomicHabitsDetails', id: 1
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

  const topReviews = [
    { title: 'Malgudi Days', author: 'R.K.Narayan', image: 'https://www.startergroup.in/image/cache/catalog/demo/novels/md_9788185986173-1000x1000h.jpg', screen: 'MalgudiDaysDetailsScreen', id: 2, rating: null },
    { title: 'Under the Same Stars', author: 'Jane Harper', image: 'https://m.media-amazon.com/images/I/81HcIAJnyQL._SL1500_.jpg', screen: 'UnderTheSameStarsDetails', id: 1, rating: null },
    { title: 'The Meadowbrook Murders', author: 'Jessica Goodman', image: 'https://m.media-amazon.com/images/I/71KJMVYP+7L._SL1500_.jpg', screen: 'MeadowbrookMurdersDetails', id: 3, rating: null },
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
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Enable location services to find your location.");
        setLoading(false);
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setLocation(locationData.coords);
      setLoading(false);
    };

    getLocation();
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
  const openMaps = () => {
    const url = "https://maps.app.goo.gl/DS7G1zooDKab4xn49?g_st=awb".trim();
    Linking.openURL(url).catch((err) => console.error("❌ Failed to open map:", err));
  };
  
  useEffect(() => {
    const fetchRatingsForAllBooks = async () => {
      setLoading(true);
      
      // Clone the original topReviews array
      const reviewsWithRatings = await Promise.all(
        topReviews.map(async (book) => {
          const { data, error } = await supabase
            .from('book_reviews')
            .select('rating')
            .eq('book_name', book.title); // Assuming 'title' matches 'book_name'
  
          if (error) {
            console.error(`Error fetching rating for ${book.title}:`, error);
            return { ...book, rating: 'N/A' };
          }
  
          const totalRatings = data.length;
          const sumRatings = data.reduce((acc, review) => acc + review.rating, 0);
          const avgRating = totalRatings ? (sumRatings / totalRatings).toFixed(1) : 'No ratings';
  
          return { ...book, rating: avgRating };
        })
      );
  
      setTopReviews(reviewsWithRatings); // Update state with ratings
      setLoading(false);
    };
  
    fetchRatingsForAllBooks();
  }, []);
  
  

  if (loading) return <ActivityIndicator size="large" color="blue" />;


  return (
    <LinearGradient 
      colors={['#91F1EF', '#FFD5E0']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.7 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {notification && (
          <View style={styles.notification}>
            <Text style={styles.notificationText}>{notification}</Text>
          </View>
        )}
  
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.header}>Discover Your Next Favorite Book</Text>
  
          {/* Upcoming Release */}
          <Animated.View style={[styles.upcomingReleases, { opacity: fadeAnim }]}>
            <Text style={styles.upcomingTitle}>🚀 Upcoming Release</Text>
            <Text style={styles.bookTitle}>Future of AI</Text>
            <Text>Author: Dr. Sarah Connor</Text>
            <Text>Release Date: May 18, 2025</Text>
            <Text style={styles.countdown}>⏳ {countdown}</Text>
  
            <Animated.View style={[styles.notifyButton, { transform: [{ scale: scaleAnim }] }]}>
              <TouchableOpacity onPress={handleNotification}>
                <Text style={styles.notifyText}>Get Notified</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
  
          {/* Featured Books */}
          <TouchableOpacity style={styles.sectionHeader} onPress={() => navigation.navigate('Featured')}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>📚 Featured Books</Text>
              <MaterialIcons name="arrow-forward-ios" size={20} color="#333" />
            </View>
          </TouchableOpacity>
  
          <FlatList
            horizontal
            data={books}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.bookCard} 
                onPress={() => item.screen ? navigation.navigate(item.screen) : console.warn(`No screen defined for ${item.title}`)}
              >
                <Image source={{ uri: item.image }} style={styles.bookImage} />
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>by {item.author}</Text>
                <Text style={styles.bookRating}>⭐ {item.rating}</Text>
                
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
  
          {/* New Arrivals */}
          <TouchableOpacity style={styles.sectionHeader} onPress={() => navigation.navigate('NewArrivals')}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>💡 New Arrivals</Text>
              <MaterialIcons name="arrow-forward-ios" size={20} color="#333" />
            </View>
          </TouchableOpacity>
  
          <FlatList
            horizontal
            data={topReviews}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.bookCard} 
                onPress={() => item.screen ? navigation.navigate(item.screen) : console.warn(`No screen defined for ${item.title}`)}
              >
                <Image source={{ uri: item.image }} style={styles.bookImage} />
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>by {item.author}</Text>
                <Text style={styles.bookRating}>⭐ {item.rating}</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />

  
          {/* Location */}
          <View style={styles.container}>
            {location ? (
              <TouchableOpacity style={styles.locationBox} onPress={openMaps}>
                <Ionicons name="location" size={20} color="white" />
                <Text style={styles.locationText}>📌 Location of Nearest Book Fair</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.errorText}>❌ Location not available</Text>
            )}
          </View>
        </ScrollView>
  
        {/* FAB - Floating Search Button */}
        <TouchableOpacity style={styles.fabCenter} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={32} color="white" />
        </TouchableOpacity>
      </View>
  
      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="home" size={26} color="#247B9F" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AddReview')}>
          <MaterialIcons name="rate-review" size={26} color="#247B9F" />
          <Text style={styles.navText}>Review</Text>
        </TouchableOpacity>
  
        {/* Space in middle is left empty for FAB */}
        <View style={{ width: 65 }} />
  
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('RecommendBooks')}>
          <MaterialIcons name="menu-book" size={26} color="#247B9F" />
          <Text style={styles.navText}>Suggest</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Account')}>
          <MaterialIcons name="person" size={26} color="#247B9F" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
  
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContent: { padding: 20 ,paddingBottom:80},
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  sectionHeader: {
    width: '100%',
    marginTop: 20,
    paddingVertical: 10,
  },
  
  header: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#2C3E50', marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#247B9F' },
  upcomingReleases: { backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 5, marginBottom: 20 },
  upcomingTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  bookTitle: { fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
  countdown: { fontSize: 16, color: '#E74C3C', marginTop: 5 },
  notifyButton: { backgroundColor: '#27AE60', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  notifyText: { color: 'white', fontWeight: 'bold' },
  notification: {
    backgroundColor: '#27AE60',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  notificationText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  bookCard: { width: 150, backgroundColor: '#fff', borderRadius: 10, padding: 10, marginRight: 15, alignItems: 'center', elevation: 5 },
  bookImage: { width: 100, height: 150, borderRadius: 5, marginBottom: 10 },
  bookAuthor: { fontSize: 14, color: '#7F8C8D' },
  bookRating: { fontSize: 16, color: '#F39C12', marginTop: 5 },
  bookReview: { fontSize: 14, color: '#7F8C8D', marginTop: 5, textAlign: 'center' },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
  button: { flexDirection: 'row', backgroundColor: '#247B9F', padding: 10, borderRadius: 5, alignItems: 'center', width: '45%' },
  buttonText: { color: 'white', marginLeft: 10, fontWeight: 'bold' },
  buttonOutline: { backgroundColor: '#fff', borderColor: '#247B9F', borderWidth: 1, padding: 12, borderRadius: 5, marginVertical: 10, alignItems: 'center' },
  buttonOutlineText: { color: '#247B9F', fontWeight: 'bold' },locationBox: { 
    backgroundColor: '#fff', 
    borderColor: '#247B9F', 
    borderWidth: 1, 
    padding: 12, 
    borderRadius: 5, 
    marginVertical: 10, 
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'center' 
  },
  
  
  locationText: { 
    color: '#247B9F', 
    fontWeight: 'bold', 
    marginLeft: 10 
  },
  
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    justifyContent: 'space-around',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  
  fabCenter: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#247B9F',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20, // makes it overlap the bottom bar
    left: '50%',
    marginLeft: -32.5, // half of width
    elevation: 10, // Android shadow
    zIndex: 10,
  
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  
    borderWidth: 4,
    borderColor: '#fff', // To create a cutout look on the white bottom bar
  },  
  errorText: { color: "red", fontSize: 16 },
  
});

export default HomeScreen;
