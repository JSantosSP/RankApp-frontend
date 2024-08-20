import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const fetchUsername = async () => {
        try {
          //llamar a la funcion para crear el usuario en la bd
          const storedUsername = await AsyncStorage.getItem('@username');
          if (storedUsername !== null) {
            navigation.navigate('RankList');
          }
        } catch (e) {
          console.error('Error al recuperar el nombre de usuario:', e);
        }
      };
      fetchUsername();
    }, [])
  );

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
    navigation.navigate('RankList');
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
    <View>
      <Text>Login Screen</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />

      <Button title="Create User" onPress={handlePage} />
    </View>
  );
};

export default LoginScreen;
