//RecommendBooksScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RecommendBooksScreen = ({ navigation }) => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [recommendationText, setRecommendationText] = useState('');
  const [rating, setRating] = useState(0); // Add rating for the book
  const [loading, setLoading] = useState(false); // Loading state for the submit button

  const handleRecommendBook = () => {
    if (bookTitle.trim() && bookAuthor.trim() && recommendationText.trim() && rating > 0) {
      setLoading(true); // Show loading spinner
      setTimeout(() => {
        // Simulate saving the recommendation
        Alert.alert('Success', 'Book recommended successfully!');
        setBookTitle('');
        setBookAuthor('');
        setRecommendationText('');
        setRating(0);
        setLoading(false); // Hide loading spinner
        navigation.goBack(); // Go back to the previous screen after recommending
      }, 1500);
    } else {
      Alert.alert('Error', 'Please provide all fields: title, author, recommendation, and rating.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommend a Book</Text>

      {/* Book Title */}
      <Text style={styles.label}>Book Title:</Text>
      <TextInput
        style={styles.input}
        value={bookTitle}
        onChangeText={setBookTitle}
        placeholder="Enter the book title"
      />

      {/* Book Author */}
      <Text style={styles.label}>Book Author:</Text>
      <TextInput
        style={styles.input}
        value={bookAuthor}
        onChangeText={setBookAuthor}
        placeholder="Enter the book author"
      />

      {/* Recommendation Text */}
      <Text style={styles.label}>Why do you recommend this book?</Text>
      <TextInput
        style={styles.textArea}
        value={recommendationText}
        onChangeText={setRecommendationText}
        multiline
        numberOfLines={4}
        placeholder="Write your recommendation here..."
      />

      {/* Rating */}
      <Text style={styles.label}>Rating (1-5):</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={30}
              color={star <= rating ? '#FFD700' : '#ccc'}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleRecommendBook} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Recommend Book'}</Text>
      </TouchableOpacity>

      {/* Loading Spinner Modal */}
      <Modal visible={loading} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Submitting your recommendation...</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f8', // Light gray background for clean look
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2C3E50', // Dark color for text
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#34495E', // Darker label color
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: '#fff', // White background for input fields
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 8,
    height: 100,
    backgroundColor: '#fff',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#27ae60', // Green button color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    transition: 'all 0.3s ease',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark semi-transparent background for loading
  },
  loadingText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RecommendBooksScreen;
