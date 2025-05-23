import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../supabaseConfig';

const RecommendBooksScreen = ({ navigation }) => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [recommendationText, setRecommendationText] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRecommendBook = async () => {
    if (!bookTitle.trim() || !bookAuthor.trim() || !recommendationText.trim() || rating === 0) {
      Alert.alert('🚨 Oops!', 'Fill all fields + a rating to submit.');
      return;
    }

    setLoading(true);

    // Get the logged-in user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      Alert.alert('❌ Error!', 'User not found. Please log in.');
      setLoading(false);
      return;
    }

    const userId = userData.user.id; // Extract the user ID

    const { data, error } = await supabase.from('recommended_books').insert([
      {
        user_id: userId, // Link book to logged-in user
        book_title: bookTitle,
        author: bookAuthor,
        recommendation_text: recommendationText,
        rating,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error('Supabase Insert Error:', error);
      Alert.alert('❌ Error!', error.message || 'Something went wrong. Please try again.');
    } else {
      Alert.alert('🔥 Success!', 'Your book recommendation is live!');
      setBookTitle('');
      setBookAuthor('');
      setRecommendationText('');
      setRating(0);
      navigation.goBack();
    }
  };

  return (
    <LinearGradient 
      colors={['#006B38FF', '#101820FF']}
      start={{ x: 0.5, y: 0 }} 
      end={{ x: 0.5, y: 0.7 }}  
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>📖 Recommend a Book</Text>

        {/* Book Title */}
        <Text style={styles.label}>📌 Book Title:</Text>
        <TextInput
          style={styles.input}
          value={bookTitle}
          onChangeText={setBookTitle}
          placeholder="Enter the book title"
          placeholderTextColor="#C0C0C0"
        />

        {/* Book Author */}
        <Text style={styles.label}>✍️ Author:</Text>
        <TextInput
          style={styles.input}
          value={bookAuthor}
          onChangeText={setBookAuthor}
          placeholder="Enter author's name"
          placeholderTextColor="#C0C0C0"
        />

        {/* Recommendation Text */}
        <Text style={styles.label}>💡 Why do you recommend this book?</Text>
        <TextInput
          style={styles.textArea}
          value={recommendationText}
          onChangeText={setRecommendationText}
          multiline
          numberOfLines={4}
          placeholder="Write your recommendation..."
          placeholderTextColor="#C0C0C0"
        />

        {/* Rating */}
        <Text style={styles.label}>⭐ Rating (1-5):</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={30}
                color={star <= rating ? '#FFD700' : '#CCCCCC'}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleRecommendBook} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Submitting...' : '🚀 Recommend'}</Text>
        </TouchableOpacity>

        {/* Loading Spinner Modal */}
        <Modal visible={loading} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Submitting your recommendation...</Text>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#F5F5DC',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#F5F5DC',
  },
  input: {
    borderWidth: 1,
    borderColor: '#F5F5DC',
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#F5F5DC',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#F5F5DC',
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 8,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#F5F5DC',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: 'rgba(134, 158, 96, 0.67)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#F2EDD7FF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  loadingText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RecommendBooksScreen;
