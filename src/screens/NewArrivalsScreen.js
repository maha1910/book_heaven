import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NewArrivalsScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.header}>New Arrivals</Text>
      <View style={styles.arrivalItem}>
        <Text style={styles.bookTitle}>Under the Same Stars</Text>
        <Text>A historical mystery spanning multiple timelines, uncovering secrets tied to a legendary tree believed to connect destined lovers.</Text>
      </View>
      <View style={styles.arrivalItem}>
        <Text style={styles.bookTitle}>The Heaven & Earth Grocery Store</Text>
        <Text>Set in a small town, this book explores race, love, and community, with a gripping plot and deeply moving characters.</Text>
      </View>
      <View style={styles.arrivalItem}>
        <Text style={styles.bookTitle}>The Meadowbrook Murders</Text>
        <Text>A thrilling mystery set in an elite boarding school where a student's quest to uncover the truth behind a murder reveals dark secrets.</Text>
      </View>
      {/* Add more new arrivals here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  arrivalItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default NewArrivalsScreen;
