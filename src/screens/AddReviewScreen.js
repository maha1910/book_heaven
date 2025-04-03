import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  TextInput,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../supabaseConfig';

const { width, height } = Dimensions.get('window');

const AddReviewScreen = ({ navigation }) => {
  const [selectedBook, setSelectedBook] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [stars, setStars] = useState([]);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRating = (star) => {
    Animated.timing(scaleAnim, {
      toValue: 1.3,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setRating(star);
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });

    let newStars = Array.from({ length: 10 }, () => ({
      id: Math.random().toString(),
      animatedValue: new Animated.Value(0),
      x: Math.random() * width,
    }));
    setStars([...stars, ...newStars]);

    newStars.forEach((star) => {
      Animated.timing(star.animatedValue, {
        toValue: height,
        duration: 1500 + Math.random() * 1000,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSubmitReview = async () => {
    if (!selectedBook || !reviewText.trim() || rating === 0) {
      Alert.alert('🚨 Hold Up!', 'Gotta pick a book, drop a review, and slap on a rating!');
      return;
    }

    // 🔥 Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      Alert.alert('🚫 Error', 'User not logged in. Please sign in first.');
      return;
    }

    try {
      console.log('Submitting review:', { user_id: user.id, selectedBook, rating, reviewText });

      const { error } = await supabase.from('book_reviews').insert([
        {
          user_id: user.id,
          book_name: selectedBook,
          rating: rating,
          review_text: reviewText,
        }
      ]);

      if (error) throw error;

      // ✅ Review submitted successfully
      Animated.sequence([
        Animated.timing(buttonAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
        Animated.timing(buttonAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();

      Alert.alert('🔥 Boom! Review Submitted!', 'Your review just landed in the hall of fame!');

      // Reset state
      setSelectedBook('');
      setReviewText('');
      setRating(0);

      // Navigate back
      navigation.goBack();
    } catch (err) {
      Alert.alert('🚨 Submission Failed!', err.message);
      console.error('❌ Review Submission Error:', err);
    }
  };

  return (
    <LinearGradient 
      colors={['#006B38FF', '#101820FF']}
      start={{ x: 0.5, y: 0 }} 
      end={{ x: 0.5, y: 0.7 }}  
      style={styles.gradient}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.title}>Drop Your Thoughts!</Text>

        <Text style={styles.label}>📚 Select Your Book:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedBook}
            onValueChange={(itemValue) => setSelectedBook(itemValue)}
            style={styles.picker}
            dropdownIconColor="#F5F5DC"
            mode="dropdown"
          >
            <Picker.Item label="Pick your masterpiece" value="" color="#C0C0C0" />
            <Picker.Item label="📘 Atomic Habits - James Clear" value="Atomic Habits" />
            <Picker.Item label="📗 Under the Same Stars - Jane Harper" value="Under the Same Stars" />
            <Picker.Item label="📙 The Heaven & Earth Grocery Store - James McBride" value="The Heaven & Earth Grocery Store" />
            <Picker.Item label="📕 Learning React - Alex Banks" value="Learning React" />
            <Picker.Item label="📓 The Meadowbrook Murders - Jessica Goodman" value="The Meadowbrook Murders" />
          </Picker>
        </View>

        <Text style={styles.label}>⭐ Rate it (1-5):</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <Animated.View style={{ transform: [{ scale: star === rating ? scaleAnim : 1 }] }}>
                <Ionicons
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={36}
                  color={star <= rating ? '#FFBF00' : '#CCCCCC'}
                  style={styles.star}
                />
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>📝 Spill Your Thoughts:</Text>
        <TextInput
          style={styles.textArea}
          value={reviewText}
          onChangeText={setReviewText}
          multiline
          numberOfLines={4}
          placeholder="Type your legendary review here..."
          placeholderTextColor="#CCCCCC"
        />

        <TouchableOpacity onPress={handleSubmitReview}>
          <Animated.View style={[styles.submitButton, { transform: [{ scale: buttonAnim }] }]}>
            <Text style={styles.buttonText}>Submit Your Review</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#F5F5DC' },
  label: { fontSize: 18, marginBottom: 8, color: '#F5F5DC' },
  pickerWrapper: { borderRadius: 10, overflow: 'hidden', marginBottom: 20, borderWidth: 1, borderColor: '#F5F5DC' },
  picker: { height: 60, width: '100%', color: '#F5F5DC' },
  ratingContainer: { flexDirection: 'row', marginBottom: 20, justifyContent: 'center' },
  textArea: { borderWidth: 1, borderColor: '#F5F5DC', padding: 12, marginBottom: 20, fontSize: 16, borderRadius: 8, height: 100, backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#F5F5DC' },
  submitButton: { backgroundColor: 'rgba(134, 158, 96, 0.67)', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#F2EDD7FF', fontWeight: 'bold', fontSize: 18 },
});

export default AddReviewScreen;
