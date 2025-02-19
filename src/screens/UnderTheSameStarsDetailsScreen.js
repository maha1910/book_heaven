import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';


const UnderTheSameStarsDetails = () => {
  return (
    <ScrollView style={styles.container}>
      <Image source={underTheSameStarsCover} style={styles.bookCover} />
      <Text style={styles.title}>Under the Same Stars</Text>
      <Text style={styles.author}>Author: Alexandra Heminsley</Text>
      <Text style={styles.year}>Published: 2022</Text>
      <Text style={styles.pages}>Pages: 320</Text>

      <Text style={styles.sectionTitle}>Summary:</Text>
      <Text style={styles.description}>
        "Under the Same Stars" follows the emotional journey of Cassie, who travels to Sweden to reconnect with her
        estranged sister after receiving a letter revealing long-hidden family secrets. The story explores themes of
        family, forgiveness, and self-discovery while set in the stunning remote landscapes of Sweden.
      </Text>

      <Text style={styles.sectionTitle}>Key Themes:</Text>
      <Text style={styles.description}>
        - Family and Sisterhood  
        - Self-Discovery  
        - Adventure and Nature  
        - Healing and Forgiveness
      </Text>

      <Text style={styles.sectionTitle}>Rating: ⭐ 4.3/5</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  bookCover: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  author: {
    fontSize: 18,
    color: 'gray',
  },
  year: {
    fontSize: 16,
    color: 'gray',
  },
  pages: {
    fontSize: 16,
    color: 'gray',
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
});

export default UnderTheSameStarsDetails;
