import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Easing } from 'react-native';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import FeaturedScreen from './src/screens/FeaturedScreen';
import SearchScreen from './src/screens/SearchScreen';
import NewArrivalsScreen from './src/screens/NewArrivalsScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import AddReviewScreen from './src/screens/AddReviewScreen';
import RecommendBooksScreen from './src/screens/RecommendBooksScreen';
import AtomicHabitsDetailsScreen from './src/screens/AtomicHabitsDetailsScreen';
import UnderTheSameStarsDetailsScreen from './src/screens/UnderTheSameStarsDetailsScreen';
import HeavenDetailsScreen from './src/screens/HeavenDetailsScreen';
import LearningReactDetailScreen from './src/screens/LearningReactDetailScreen';

const Stack = createStackNavigator();

// 🎨 Custom animations for smooth transitions
const scaleEffect = {
  cardStyleInterpolator: ({ current }) => ({
    cardStyle: {
      transform: [
        {
          scale: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1], // Start at 80% and grow to full size
          }),
        },
      ],
    },
  }),
};

const slideEffect = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Slide in from right
};

const bounceEffect = {
  transitionSpec: {
    open: {
      animation: 'timing',
      config: { duration: 500, easing: Easing.bounce },
    },
    close: {
      animation: 'timing',
      config: { duration: 300, easing: Easing.linear },
    },
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={scaleEffect} />
        <Stack.Screen name="Featured" component={FeaturedScreen} options={slideEffect} />
        <Stack.Screen name="Search" component={SearchScreen} options={bounceEffect} />
        <Stack.Screen name="NewArrivals" component={NewArrivalsScreen} options={slideEffect} />
        <Stack.Screen name="AddReview" component={AddReviewScreen} options={scaleEffect} />
        <Stack.Screen name="RecommendBooks" component={RecommendBooksScreen} options={bounceEffect} />
        <Stack.Screen name="AtomicHabitsDetails" component={AtomicHabitsDetailsScreen} options={scaleEffect} />
        <Stack.Screen name="UnderTheSameStarsDetails" component={UnderTheSameStarsDetailsScreen} options={slideEffect} />
        <Stack.Screen name="HeavenDetails" component={HeavenDetailsScreen} options={bounceEffect} />
        <Stack.Screen name="LearningReactDetailScreen" component={LearningReactDetailScreen} options={scaleEffect} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
