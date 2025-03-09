import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LearningReactDetailScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: 'https://m.media-amazon.com/images/I/51ad7GkEzNL.jpg' }} 
        style={styles.bookCover} 
      />
      
      <Text style={styles.title}>Learning React</Text>
      <Text style={styles.author}>Author: Alex Banks</Text>
      <Text style={styles.year}>Published: 2020</Text>
      <Text style={styles.pages}>Pages: 350</Text>

      <Text style={styles.sectionTitle}>Summary:</Text>
      <Text style={styles.description}>
        "Learning React" is a hands-on guide to understanding and using React.js for building modern web applications. 
        The book covers React fundamentals, hooks, state management, and best practices for scalable applications.
      </Text>

      <Text style={styles.sectionTitle}>Key Takeaways:</Text>
      <Text style={styles.description}>
        - Understand the React component lifecycle{"\n"}
        - Learn about React Hooks for state and effects{"\n"}
        - Manage global state efficiently with Context and Redux{"\n"}
        - Build performant and scalable React apps
      </Text>

      <Text style={styles.sectionTitle}>Rating: ⭐ 5.0/5</Text>

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

export default LearningReactDetailScreen;
