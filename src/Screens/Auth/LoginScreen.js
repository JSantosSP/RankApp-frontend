import { StyleSheet, Button, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  const storeUsername = async (username) => {
    try {
      //añadir codigo para comprobar que es el unico nickname en la base de datos
      await AsyncStorage.setItem('@username', username);
    } catch (e) {
      console.error('Error al guardar el nombre de usuario:', e);
    }
  };

  const handlePage = async () => {
    await storeUsername(username); 
    navigation.navigate('Home');
  };

  const styles = StyleSheet.create({
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      width: '80%',
    },
  });

  return (
    <TabBar navigation={navigation}>
      <Text>Login Screen</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />

      <Button title="Create User" onPress={handlePage} />
    </TabBar>
    
  );
};

export default LoginScreen;
