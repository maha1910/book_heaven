import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const meadowbrookCover = require('../../assets/meadowbrook-murders-cover.jpg'); // Ensure correct path

const MeadowbrookMurdersDetails = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient 
      colors={['#F2AA4CFF', '#101820FF']}  // Flipped colors for upside-down effect
      start={{ x: 0.5, y: 0 }}  // Starts from the bottom
      end={{ x: 0.5, y: 0.7 }}    // Ends at the top
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={meadowbrookCover} style={styles.bookCover} />
        <Text style={styles.title}>The Meadowbrook Murders</Text>
        <Text style={styles.author}>Author: Jessica Goodman</Text>
        <Text style={styles.year}>Published: 2024</Text>
        <Text style={styles.pages}>Pages: 350</Text>
        
        <Text style={styles.sectionTitle}>Summary:</Text>
        <Text style={styles.description}>
          *The Meadowbrook Murders* is a thrilling mystery novel that unravels a series of unsolved crimes 
          in a quiet suburban town. Detective Harper Reed must piece together clues hidden within the town’s 
          darkest secrets before the murderer strikes again.
        </Text>
        
        <Text style={styles.sectionTitle}>Key Themes:</Text>
        <Text style={styles.description}>
          - Mystery & Investigation{'\n'}
          - Secrets & Lies{'\n'}
          - Small-Town Suspense
        </Text>
        
        <Text style={styles.sectionTitle}>Rating: ⭐ 4.6/5</Text>

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
    marginBottom: 15,
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
    marginBottom: 10,
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

export default MeadowbrookMurdersDetails;
