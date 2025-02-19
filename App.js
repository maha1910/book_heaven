import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Ensure all screen imports are correct
import HomeScreen from './src/screens/HomeScreen';
import FeaturedScreen from './src/screens/FeaturedScreen';
import SearchScreen from './src/screens/SearchScreen';
import NewArrivalsScreen from './src/screens/NewArrivalsScreen';
import LoginScreen from './src/screens/LoginScreen'; 
import AddReviewScreen from './src/screens/AddReviewScreen'; 
import RecommendBooksScreen from './src/screens/RecommendBooksScreen'; 
import AtomicHabitsDetails from './src/screens/AtomicHabitsDetailsScreen'; 
import UnderTheSameStarsDetails from './src/screens/UnderTheSameStarsDetailsScreen'; 
import HeavenDetailsScreen from './src/screens/HeavenDetailsScreen'; 
import LearningReactDetails from './src/screens/LearningReactDetailScreen'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Featured" component={FeaturedScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="NewArrivals" component={NewArrivalsScreen} />
        <Stack.Screen name="AddReview" component={AddReviewScreen} />
        <Stack.Screen name="RecommendBooks" component={RecommendBooksScreen} />
        
        {/* Book detail screens */}
        <Stack.Screen name="AtomicHabitsDetailsScreen" component={AtomicHabitsDetails} />
        <Stack.Screen name="UnderTheSameStarsDetails" component={UnderTheSameStarsDetails} />
        <Stack.Screen name="HeavenDetailsScreen" component={HeavenDetailsScreen} />
        <Stack.Screen name="LearningReactDetailScreen" component={LearningReactDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
