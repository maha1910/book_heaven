import React from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const FeaturedScreen = ({ navigation }) => {
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
      {/* Hero Section */}
      <ImageBackground source={{ uri: featuredBooks[0].image }} style={styles.hero} blurRadius={8}>
        <Text style={styles.heroText}>✨ Featured Books 📚</Text>
      </ImageBackground>

      {/* Books List */}
      <FlatList
        data={featuredBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
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
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDCB5',
  },
  hero: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  listContent: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bookImage: {
    width: 90,
    height: 130,
    borderRadius: 8,
    marginRight: 15,
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  bookRating: {
    fontSize: 16,
    color: '#F39C12',
    marginBottom: 10,
  },
  detailsButton: {
    flexDirection: 'row',
    backgroundColor: '#2980B9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default FeaturedScreen;
