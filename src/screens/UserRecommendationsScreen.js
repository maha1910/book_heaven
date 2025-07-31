import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const UserRecommendationsScreen = ({ route }) => {
  const { recommendedBooks } = route.params;

  return (
    <LinearGradient
      colors={['#a18cd1', '#fbc2eb']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>✨ Your Book Recommendations</Text>

        {recommendedBooks.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>You haven’t received any recommendations yet.</Text>
          </View>
        ) : (
          recommendedBooks.map((book, index) => (
            <LinearGradient
              key={index}
              colors={['#e1bee7', '#d1c4e9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientCard}
            >
              <View style={styles.cardInner}>
                <Text style={styles.bookTitle}>{book.book_title}</Text>
                <Text style={styles.reason}>
                  {book.recommendation_text || 'No reason provided.'}
                </Text>
              </View>
            </LinearGradient>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  noDataContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  gradientCard: {
    borderRadius: 18,
    marginBottom: 20,
    padding: 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardInner: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  reason: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    textAlign: 'justify',
  },
});

export default UserRecommendationsScreen;
