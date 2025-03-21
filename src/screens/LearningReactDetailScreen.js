import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const LearningReactDetailScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient 
      colors={['#F2AA4CFF', '#101820FF']}  // Same gradient effect
      start={{ x: 0.5, y: 0 }}  // Gradient starts from top
      end={{ x: 0.5, y: 0.7 }}  // Fades midway
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 15,
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
    color: 'white',
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    color: '#ecf0f1',
    textAlign: 'center',
  },
  year: {
    fontSize: 16,
    color: '#ecf0f1',
    textAlign: 'center',
  },
  pages: {
    fontSize: 16,
    color: '#ecf0f1',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#ecf0f1',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default LearningReactDetailScreen;
