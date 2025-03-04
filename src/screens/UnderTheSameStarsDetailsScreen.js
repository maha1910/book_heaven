import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

// Ensure correct image import (use the right path or a URL)
const underTheSameStarsCover = { uri: 'https://m.media-amazon.com/images/I/81HcIAJnyQL._SL1500_.jpg' };

const UnderTheSameStarsDetails = () => {
  return (
    <ScrollView style={styles.container}>
      <Image source={underTheSameStarsCover} style={styles.bookCover} />
      
      <Text style={styles.title}>Under the Same Stars</Text>
      <Text style={styles.author}>Author: Alexandra Heminsley</Text>
      <Text style={styles.year}>📅 Published: 2022</Text>
      <Text style={styles.pages}>📖 Pages: 320</Text>

      <Text style={styles.sectionTitle}>📜 Summary:</Text>
      <Text style={styles.description}>
        "Under the Same Stars" follows the emotional journey of Cassie, who travels to Sweden to reconnect with her
        estranged sister after receiving a letter revealing long-hidden family secrets. The story explores themes of
        family, forgiveness, and self-discovery while set in the stunning remote landscapes of Sweden.
      </Text>

      <Text style={styles.sectionTitle}>✨ Key Themes:</Text>
      <Text style={styles.description}>
        • Family and Sisterhood{'\n'}
        • Self-Discovery{'\n'}
        • Adventure and Nature{'\n'}
        • Healing and Forgiveness
      </Text>

      <Text style={styles.sectionTitle}>⭐ Rating: 4.3/5</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  bookCover: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  author: {
    fontSize: 18,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  year: {
    fontSize: 16,
    color: '#95A5A6',
    marginBottom: 3,
  },
  pages: {
    fontSize: 16,
    color: '#95A5A6',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495E',
    marginTop: 15,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#2C3E50',
  },
});

export default UnderTheSameStarsDetails;
