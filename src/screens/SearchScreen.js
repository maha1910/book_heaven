import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  const books = [
    { title: 'Atomic Habits', author: 'James Clear', rating: 4.5 },
    { title: 'Under the Same Stars', author: 'Jane Harper', rating: 4.2 },
    { title: 'The Heaven & Earth Grocery Store', author: 'James McBride', rating: 4.8 },
    { title: 'The Great Adventure', author: 'Mark Twain', rating: 4.0 },
    { title: 'Learning React', author: 'Alex Banks', rating: 5.0 },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredBooks([]);
    } else {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search books..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {searchQuery.length > 0 && (
        <View style={styles.searchResults}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <View key={index} style={styles.searchResultItem}>
                <Text style={styles.searchResultTitle}>{book.title}</Text>
                <Text>Author: {book.author}</Text>
                <Text>Rating: {book.rating}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noResults}>No books found.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  searchResults: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
  },
  searchResultItem: {
    marginBottom: 10,
  },
  searchResultTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  noResults: {
    color: 'gray',
  },
});

export default SearchScreen;
