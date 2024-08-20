import { StyleSheet, View, Button, Text, TextInput, Alert } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../Utils/api';

const LoginScreen = ({ navigation }) => {
  const [nickname, setNickname] = useState('');

  
  useFocusEffect(
    useCallback(() => {
      const fetchNickname = async () => {
        try {
          const storedNickname = await AsyncStorage.getItem('@nickname');
          if (storedNickname !== null) {
            navigation.navigate('RankList');
          }
        } catch (e) {
          console.error('Error al recuperar el nombre de usuario:', e);
        }
      };
      fetchNickname();
    }, [])
  );

  
  const storeNickname = async (nickname) => {
    try {
      const objData = { nickname: nickname };
      const searchResult = await api.get('/users/:nickname', objData)
      if (searchResult.message !== "User not found") {
        Alert.alert('Error', 'El nombre de usuario ya existe');
        return false;
      } else {
        const createUserResponse = await api.post('/users/',null, objData);
        await AsyncStorage.setItem('@nickname', createUserResponse.data.nickname);
        return true;
      }
    } catch (e) {
      console.error('Error al guardar el nombre de usuario:', e);
      return false;
    }
  };

  
  const handlePage = async () => {
    const success = await storeNickname(nickname);
    if (success) {
      navigation.navigate('RankList');
    }
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
        value={nickname}
        onChangeText={setNickname}
      />

      <Button title="Create User" onPress={handlePage} />
    </View>
  );
};

export default LoginScreen;
