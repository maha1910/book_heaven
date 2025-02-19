import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const HeavenDetailsScreen = () => {
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
    </ScrollView>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.homeContainer}>
      <Button title="View Book Details" onPress={() => navigation.navigate('HeavenDetails')} />
    </View>
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
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default  HeavenDetailsScreen ;
