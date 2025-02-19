import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';


const LearningReactDetails = () => {
  return (
    <ScrollView style={styles.container}>
      <Image source={learningReactCover} style={styles.bookCover} />
      <Text style={styles.title}>Learning React: Modern Patterns for Developing React Apps</Text>
      <Text style={styles.author}>Author: Alex Banks & Eve Porcello</Text>
      <Text style={styles.year}>Published: 2020</Text>
      <Text style={styles.pages}>Pages: 350</Text>

      <Text style={styles.sectionTitle}>Summary:</Text>
      <Text style={styles.description}>
        "Learning React" provides a comprehensive introduction to React, covering fundamental concepts, modern 
        patterns, and best practices. The book guides readers through building scalable and maintainable React applications.
      </Text>

      <Text style={styles.sectionTitle}>Key Takeaways:</Text>
      <Text style={styles.description}>
        - Understanding the core concepts of React, including components, state, and props.  
        - Learning modern React patterns such as Hooks and Context API.  
        - Managing application state efficiently.  
        - Building scalable and maintainable applications with React and its ecosystem.
      </Text>

      <Text style={styles.sectionTitle}>Rating: ⭐ 4.7/5</Text>
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

export default LearningReactDetails;

