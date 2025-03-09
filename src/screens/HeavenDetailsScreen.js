import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const heavenAndEarthCover = require('../../assets/heaven-and-earth-cover.jpg'); // Ensure correct path

const HeavenDetailsScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Image source={heavenAndEarthCover} style={styles.bookCover} />
      <Text style={styles.title}>The Heaven & Earth Grocery Store</Text>
      <Text style={styles.author}>Author: James McBride</Text>
      <Text style={styles.year}>Published: 2023</Text>
      <Text style={styles.pages}>Pages: 400</Text>
      
      <Text style={styles.sectionTitle}>Summary:</Text>
      <Text style={styles.description}>
        *The Heaven & Earth Grocery Store* is a compelling novel about a small, diverse community in Pottstown,
        Pennsylvania. Through rich storytelling, McBride explores themes of love, belonging, and the struggles of
        marginalized people, all centered around a dilapidated grocery store that holds generations of history.
      </Text>
      
      <Text style={styles.sectionTitle}>Key Themes:</Text>
      <Text style={styles.description}>
        - Community and Belonging
      </Text>
      
      <Text style={styles.sectionTitle}>Rating: ⭐ 4.7/5</Text>

      {/* Back to Home Button */}
      <View style={styles.buttonContainer}>
        <Button title="Back to Home" onPress={() => navigation.navigate('Home')} color="#007AFF" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#d4a5d2',
  },
  bookCover: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
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
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default HeavenDetailsScreen;