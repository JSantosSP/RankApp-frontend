import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/Screens/Auth/LoginScreen';
import HomeScreen from './src/Screens/Home/HomeScreen';
import RankListScreen from './src/Screens/RankList/RankListScreen';
import CreateRankListScreen from './src/Screens/RankList/CreateRankListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Auth" component={LoginScreen} />
        <Stack.Screen name="RankList" component={RankListScreen} />
        <Stack.Screen name="CreateRank" component={CreateRankListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
