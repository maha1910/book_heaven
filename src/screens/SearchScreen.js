import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Animated, { FadeIn, FadeOut, BounceIn, BounceOut } from 'react-native-reanimated';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const books = [
    { title: 'Atomic Habits', author: 'James Clear', rating: 4.5, description: 'A guide to building good habits and breaking bad ones.' },
    { title: 'Under the Same Stars', author: 'Jane Harper', rating: 4.2, description: 'A thrilling mystery novel set in the Australian outback.' },
    { title: 'The Heaven & Earth Grocery Store', author: 'James McBride', rating: 4.8, description: 'A deeply moving novel about community and resilience.' },
    { title: 'The Great Adventure', author: 'Mark Twain', rating: 4.0, description: 'An exciting tale of exploration and discovery.' },
    { title: 'Learning React', author: 'Alex Banks', rating: 5.0, description: 'A comprehensive guide to mastering React development.' },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredBooks([]);
    } else {
      setLoading(true);
      setTimeout(() => {
        const filtered = books.filter(
          (book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredBooks(filtered);
        setLoading(false);
      }, 500);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredBooks([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {/* Search Input */}
      <Animated.View style={styles.searchContainer} entering={BounceIn} exiting={BounceOut}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#27ae60" style={styles.loader} />}

      {/* Search Results */}
      {!loading && searchQuery.length > 0 && (
        <Animated.View style={styles.searchResults} entering={FadeIn} exiting={FadeOut}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.searchResultItem} 
                entering={FadeIn} 
                onPress={() => navigation.navigate('BookDetails', { book })}
              >
                <Text style={styles.searchResultTitle}>{book.title}</Text>
                <Text>Author: {book.author}</Text>
                <Text>Rating: {book.rating} ⭐</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResults}>No books found.</Text>
          )}
        </Animated.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#b0eeb1',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  clearButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 20,
  },
  searchResults: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  searchResultItem: {
    marginBottom: 15,
    paddingVertical: 5,
  },
  searchResultTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2C3E50',
  },
  noResults: {
    color: '#7f8c8d',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SearchScreen;
