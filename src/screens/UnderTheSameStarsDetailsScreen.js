import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// Ensure correct image import (use the right path or a URL)
const underTheSameStarsCover = { uri: 'https://m.media-amazon.com/images/I/81HcIAJnyQL._SL1500_.jpg' };

const UnderTheSameStarsDetails = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient 
      colors={['#F2AA4CFF', '#101820FF']} // Purple to Blue gradient
      start={{ x: 0.5, y: 0 }}  
      end={{ x: 0.5, y: 0.7 }}  
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
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
          • Family and Sisterhood{"\n"}
          • Self-Discovery{"\n"}
          • Adventure and Nature{"\n"}
          • Healing and Forgiveness
        </Text>

        <Text style={styles.sectionTitle}>⭐ Rating: 4.3/5</Text>

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
    padding: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 15,
    marginBottom: 8,
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

export default UnderTheSameStarsDetails;
