//AddReviewScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddReviewScreen = ({ navigation }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmitReview = () => {
    if (reviewText.trim() && rating > 0) {
      // Normally save the review to a database
      Alert.alert('Review Submitted', 'Your review has been submitted successfully!');
      setReviewText('');
      setRating(0);
      navigation.goBack(); // Go back to the previous screen after submitting
    } else {
      Alert.alert('Error', 'Please provide a review and rating.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Review</Text>

      {/* Rating Section */}
      <Text style={styles.label}>Book Rating (1-5):</Text>
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

      {/* Review Section */}
      <Text style={styles.label}>Your Review:</Text>
      <TextInput
        style={styles.textArea}
        value={reviewText}
        onChangeText={setReviewText}
        multiline
        numberOfLines={4}
        placeholder="Write your review here..."
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#87f1c9', // Light background color
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2C3E50',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#34495E',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 8,
    height: 100,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#3498db', // Blue button color
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
});

export default AddReviewScreen;
