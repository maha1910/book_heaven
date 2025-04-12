// tabs/Tabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import AddReview from '../screens/AddReviewScreen'; 
import Search from '../screens/SearchScreen';
import RecommendBooks from '../screens/RecommendBooksScreen';
import AccountScreen from '../screens/Account';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'AddReview') iconName = 'create';
          else if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'Recommend') iconName = 'book';
          else if (route.name === 'Account') iconName = 'person';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#247B9F',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          paddingBottom: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AddReview" component={AddReview} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Recommend" component={RecommendBooks} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;
