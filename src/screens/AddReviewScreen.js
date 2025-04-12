// ✨ Final version with upgraded star shower and Supabase submission
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
  TextInput,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons, MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../supabaseConfig';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

    // 🌠 Boosted Star Shower
    const STAR_COUNT = 30;
    let newStars = Array.from({ length: STAR_COUNT }, () => ({
      id: Math.random().toString(),
      animatedValue: new Animated.Value(0),
      x: Math.random() * width,
    }));
    setStars((prev) => [...prev, ...newStars]);

    newStars.forEach((star) => {
      Animated.timing(star.animatedValue, {
        toValue: height + 30,
        duration: 1200 + Math.random() * 1000,
        useNativeDriver: true,
      }).start(() => {
        // Optional: clean up finished stars
        setStars((prev) => prev.filter((s) => s.id !== star.id));
      });
    });
  };

  const handleSubmitReview = async () => {
    if (!selectedBook || !reviewText.trim() || rating === 0) {
      Alert.alert('🚨 Hold Up!', 'Gotta pick a book, drop a review, and slap on a rating!');
      return;
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      Alert.alert('🚫 Error', 'User not logged in. Please sign in first.');
      return;
    }

    try {
      const { error } = await supabase.from('book_reviews').insert([
        {
          user_id: user.id,
          book_name: selectedBook,
          rating: rating,
          review_text: reviewText,
        }
      ]);

      if (error) throw error;

      Animated.sequence([
        Animated.timing(buttonAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
        Animated.timing(buttonAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();

      Alert.alert('🔥 Boom! Review Submitted!', 'Your review just landed in the hall of fame!');

      setSelectedBook('');
      setReviewText('');
      setRating(0);

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
      <ScrollView>
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
            <Picker.Item label="📒 The Meadowbrook Murders - Jessica Goodman" value="The Meadowbrook Murders" />
            <Picker.Item label="📓 Malgudi Days - R.K.Narayan" value="Malgudi Days" />
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

        {/* 🌠 Star Shower Animation */}
        {stars.map((star) => (
          <Animated.View
            key={star.id}
            style={{
              position: 'absolute',
              top: 0,
              left: star.x,
              transform: [{ translateY: star.animatedValue }],
              zIndex: -1,
            }}
          >
            <MaterialCommunityIcons name="star-four-points" size={24} color="#FFD700" />
          </Animated.View>
        ))}
      </Animated.View>
      </ScrollView>
      <View>
        {/* FAB - Floating Search Button */}
        <TouchableOpacity style={styles.fabCenter} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={28} color="white" />
        </TouchableOpacity>
      </View>
      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="home" size={26} color="#000" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AddReview')}>
          <MaterialIcons name="rate-review" size={26} color="#000" />
          <Text style={styles.navText}>Review</Text>
        </TouchableOpacity>
  
        {/* Space in middle is left empty for FAB */}
        <View style={{ width: 65 }} />
  
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('RecommendBooks')}>
          <MaterialIcons name="menu-book" size={26} color="#000" />
          <Text style={styles.navText}>Suggest</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Account')}>
          <MaterialIcons name="person" size={26} color="#000" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
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
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    justifyContent: 'space-around',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  fabCenter: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20, // makes it overlap the bottom bar
    left: '50%',
    marginLeft: -32.5, // half of width
    elevation: 10, // Android shadow
    zIndex: 10,
  
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  
    borderWidth: 4,
    borderColor: '#fff', // To create a cutout look on the white bottom bar
  }, 
});

export default AddReviewScreen;
