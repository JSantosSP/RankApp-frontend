import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Text } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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

  const handlePage = () => {
    navigation.navigate('Auth');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text>{username ? `Hello ${username}` : 'Home Screen'}</Text>
      {username === null && (
        <Button title="Go to Auth" onPress={handlePage} />
      )}
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;
