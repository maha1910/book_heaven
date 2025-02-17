import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const RecommendBooksScreen = ({ navigation }) => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [recommendationText, setRecommendationText] = useState('');

  const handleRecommendBook = () => {
    if (bookTitle.trim() && bookAuthor.trim() && recommendationText.trim()) {
      // Here you would normally save the recommendation to a database
      alert('Book recommended successfully!');
      setBookTitle('');
      setBookAuthor('');
      setRecommendationText('');
      navigation.goBack(); // Go back to the previous screen after recommending
    } else {
      alert('Please provide the book title, author, and recommendation.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommend a Book</Text>

      <Text style={styles.label}>Book Title:</Text>
      <TextInput
        style={styles.input}
        value={bookTitle}
        onChangeText={setBookTitle}
        placeholder="Enter the book title"
      />

      <Text style={styles.label}>Book Author:</Text>
      <TextInput
        style={styles.input}
        value={bookAuthor}
        onChangeText={setBookAuthor}
        placeholder="Enter the book author"
      />

      <Text style={styles.label}>Why do you recommend this book?</Text>
      <TextInput
        style={styles.textArea}
        value={recommendationText}
        onChangeText={setRecommendationText}
        multiline
        numberOfLines={4}
        placeholder="Write your recommendation here..."
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleRecommendBook}>
        <Text style={styles.buttonText}>Recommend Book</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 5,
    height: 100,
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RecommendBooksScreen;
