import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AtomicHabitsDetailsScreen = () => {
  const navigation = useNavigation(); // Get navigation instance

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/81bGKUa1e0L.jpg' }} 
        style={styles.bookCover} 
      />
      
      <Text style={styles.title}>Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones</Text>
      <Text style={styles.author}>Author: James Clear</Text>
      <Text style={styles.year}>Published: 2018</Text>
      <Text style={styles.pages}>Pages: 320</Text>

      <Text style={styles.sectionTitle}>Summary:</Text>
      <Text style={styles.description}>
        "Atomic Habits" focuses on building good habits, breaking bad ones, and making small, consistent changes
        that lead to remarkable results over time.
      </Text>

      <Text style={styles.sectionTitle}>Key Takeaways:</Text>
      <Text style={styles.description}>
        - Small changes, compounded over time, lead to big results.{"\n"}
        - Focus on identity-based habits.{"\n"}
        - The four-step framework for behavior change: Cue, Craving, Response, Reward.{"\n"}
        - Make habits easy, attractive, and satisfying.
      </Text>

      <Text style={styles.sectionTitle}>Rating: ⭐ 4.8/5</Text>

      {/* Back to Home Button */}
      <View style={styles.buttonContainer}>
        <Button title="Back to Home" onPress={() => navigation.navigate('Home')} color="#007AFF" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#d4a5d2',
  },
  bookCover: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  year: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  pages: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginVertical: 5,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default AtomicHabitsDetailsScreen;
