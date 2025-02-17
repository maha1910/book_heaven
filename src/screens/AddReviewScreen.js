import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const AddReviewScreen = ({ navigation }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmitReview = () => {
    if (reviewText.trim() && rating > 0) {
      // Here you would normally save the review to a database
      alert('Review submitted successfully!');
      setReviewText('');
      setRating(0);
      navigation.goBack(); // Go back to the previous screen after submitting
    } else {
      alert('Please provide a review and rating.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Review</Text>

      <Text style={styles.label}>Book Rating (1-5):</Text>
      <TextInput
        style={styles.input}
        value={rating.toString()}
        onChangeText={(text) => setRating(Number(text))}
        keyboardType="numeric"
        maxLength={1}
      />

      <Text style={styles.label}>Your Review:</Text>
      <TextInput
        style={styles.textArea}
        value={reviewText}
        onChangeText={setReviewText}
        multiline
        numberOfLines={4}
        placeholder="Write your review here..."
      />

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
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddReviewScreen;
