import {  Button, Text } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import TabBar from '../../Components/Base/TabBar';

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUsername = async () => {
        try {
          const storedUsername = await AsyncStorage.getItem('@username');
          if (storedUsername !== null) {
            setUsername(storedUsername);
          }
        } catch (e) {
          console.error('Error al recuperar el nombre de usuario:', e);
        }
      };
      fetchUsername();
    }, [])
  );


  return (
    <TabBar navigation={navigation}>
      <Text>{username ? `Hello ${username}` : 'Home Screen'}</Text>
      <Button title="Go to rank list" onPress={() => handlePage('rank')} />
    </TabBar>
  );
};

export default HomeScreen;
