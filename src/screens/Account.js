import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Image, Alert, RefreshControl
} from 'react-native';
import { supabase } from '../../supabaseConfig';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AccountScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

const onRefresh = async () => {
  setRefreshing(true);
  await fetchUserData(); // Re-fetches user data
  setRefreshing(false);
};


  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      Alert.alert('Error', 'Failed to fetch user data. Please login again.');
      navigation.replace('Login');
      return;
    }

    const userId = user.id;
    const username = user.user_metadata?.username || 'Unknown';
    const email = user.email;

    setUserData({ username, email });

    // ✅ Fetch all reviews directly
    const { data: userReviews, error: reviewError } = await supabase
      .from('book_reviews')
      .select('*')
      .eq('user_id', userId);

    if (reviewError) {
      console.error('Review Fetch Error:', reviewError);
    } else {
      setReviews(userReviews || []);
    }

    // ✅ Fetch recommendations
    const { data: userRecommended, error: recommendedError } = await supabase
      .from('recommended_books')
      .select('*')
      .eq('user_id', userId);

    if (recommendedError) {
      console.error('Recommended Fetch Error:', recommendedError);
    } else {
      setRecommendedBooks(userRecommended || []);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert('Error', error.message);
    else {
      Alert.alert('Logged Out', 'You have been logged out!');
      navigation.replace('Login');
    }
  };

  // Inside AccountScreen component

const handleLogoutPrompt = () => {
  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: handleLogout,
        style: 'destructive',
      },
    ],
    { cancelable: true }
  );
};

return (
  <LinearGradient colors={['#a18cd1', '#fbc2eb']} style={styles.gradient}>
    <ScrollView contentContainerStyle={styles.container} refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Profile</Text>
        <TouchableOpacity onPress={handleLogoutPrompt}>
          <Ionicons name="log-out-outline" size={33} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/avatar.png')}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>{userData?.username || 'Username'}</Text>
        <Text style={styles.role}>Book Lover</Text>

        <View style={styles.infoBox}>
          <MaterialIcons name="email" size={20} color="#777" />
          <Text style={styles.infoText}>{userData?.email}</Text>
        </View>

        <TouchableOpacity
          style={styles.infoBox}
          onPress={() => navigation.navigate('UserReviews', { reviews })}
        >
          <Feather name="book-open" size={20} color="#777" />
          <Text style={styles.infoText}>Total Reviews: {reviews.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoBox}
          onPress={() => navigation.navigate('UserRecommendations', { recommendedBooks })}
        >
          <Feather name="star" size={20} color="#777" />
          <Text style={styles.infoText}>Recommendations: {recommendedBooks.length}</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>

    {/* Floating Action Button */}
    <TouchableOpacity style={styles.fabCenter} onPress={() => navigation.navigate('Search')}>
      <Ionicons name="search" size={32} color="white" />
    </TouchableOpacity>

    {/* Bottom Navigation */}
    <View style={styles.bottomTabBar}>
      <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
        <MaterialIcons name="home" size={26} color="#000" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AddReview')}>
        <MaterialIcons name="rate-review" size={26} color="#000" />
        <Text style={styles.navText}>Review</Text>
      </TouchableOpacity>

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
  gradient: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileCard: {
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 30,
  },
  avatarContainer: {
    backgroundColor: '#a18cd1',
    borderRadius: 50,
    padding: 5,
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
  role: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    width: '100%',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#444',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E74C3C',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
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
    bottom: 20,
    left: '50%',
    marginLeft: -32.5,
    elevation: 10,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 4,
    borderColor: '#fff',
  },
  navText: {
    fontSize: 12,
    color: '#000',
  },
});

export default AccountScreen;
