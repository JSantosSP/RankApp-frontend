import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/Screens/Auth/LoginScreen';
import RankScreen from './src/Screens/Rank/RankScreen';
import RankListScreen from './src/Screens/RankList/RankListScreen';
import CreateRankListScreen from './src/Screens/RankList/CreateRankListScreen';
import CreateActivityScreen from './src/Screens/Activity/CreateActivityScreen';
import ProfileScreen from './src/Screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Rank" component={RankScreen} />
        <Stack.Screen name="Auth" component={LoginScreen} />
        <Stack.Screen name="RankList" component={RankListScreen} />
        <Stack.Screen name="CreateRank" component={CreateRankListScreen} />
        <Stack.Screen name="CreateActivity" component={CreateActivityScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
