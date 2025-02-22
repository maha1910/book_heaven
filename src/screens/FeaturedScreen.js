import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FeaturedScreen = ({ navigation }) => {
  // Array of featured books with real book cover images
  const featuredBooks = [
    { 
      title: 'Atomic Habits', author: 'James Clear', rating: 4.5, 
      image: 'https://images-na.ssl-images-amazon.com/images/I/81bGKUa1e0L.jpg', 
      screen: 'AtomicHabitsDetailsScreen', id: 1 
    },
    { 
      title: 'Under the Same Stars', author: 'Jane Harper', rating: 4.2, 
      image: 'https://images-na.ssl-images-amazon.com/images/I/81Nefqo2-zL.jpg', 
      screen: 'UnderTheSameStarsDetailsScreen', id: 2 
    },
    { 
      title: 'The Heaven & Earth Grocery Store', author: 'James McBride', rating: 4.8, 
      image: 'https://images-na.ssl-images-amazon.com/images/I/81Vf7B8J6YL.jpg', 
      screen: 'HeavenDetailsScreen', id: 3 
    },
    { 
      title: 'Learning React', author: 'Alex Banks', rating: 5.0, 
      image: 'https://images-na.ssl-images-amazon.com/images/I/91DHuDSZtTL.jpg', 
      screen: 'LearningReactDetailScreen', id: 4 
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <Text style={styles.header}>✨ Featured Books 📚</Text>

        {/* Book List */}
        <FlatList
          data={featuredBooks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.bookContainer}>
              <Image source={{ uri: item.image }} style={styles.bookImage} />
              <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>by {item.author}</Text>
                <Text style={styles.bookRating}>⭐ {item.rating}</Text>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => navigation.navigate(item.screen)}
                >
                  <Ionicons name="book-outline" size={20} color="white" />
                  <Text style={styles.buttonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fc', // Light background color
  },
  scrollViewContent: {
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495E', // Dark text color for header
    marginBottom: 20,
  },
  bookContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#BDC3C7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 15,
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  bookRating: {
    fontSize: 16,
    color: '#F39C12', // Golden rating color
    marginBottom: 12,
  },
  detailsButton: {
    flexDirection: 'row',
    backgroundColor: '#2980B9', // Rich blue for buttons
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    transition: 'all 0.3s ease', // Smooth button hover effect
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FeaturedScreen;
