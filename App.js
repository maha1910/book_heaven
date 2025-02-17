import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Update the import paths to the correct location of the screens
import HomeScreen from './src/screens/HomeScreen';
import FeaturedScreen from './src/screens/FeaturedScreen';
import SearchScreen from './src/screens/SearchScreen';
import NewArrivalsScreen from './src/screens/NewArrivalsScreen';
import BookDetailsScreen from './src/screens/BookDetailsScreen'; // Import the new screen
import LoginScreen from './src/screens/LoginScreen'; // Import the login screen
import AddReviewScreen from './src/screens/AddReviewScreen'; // Import the AddReview screen
import RecommendBooksScreen from './src/screens/RecommendBooksScreen'; // Import the RecommendBooks screen

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Featured" component={FeaturedScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="NewArrivals" component={NewArrivalsScreen} />
        <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
        <Stack.Screen name="AddReview" component={AddReviewScreen} /> {/* Add AddReviewScreen */}
        <Stack.Screen name="RecommendBooks" component={RecommendBooksScreen} /> {/* Add RecommendBooksScreen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
