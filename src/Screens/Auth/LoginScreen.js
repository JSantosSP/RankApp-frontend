import { StyleSheet, View, Button, Text, TextInput, Alert } from 'react-native';
import React, { useState, useCallback } from 'react';
import api from '../../Utils/api';

const LoginScreen = ({ navigation }) => {
  const [nickname, setNickname] = useState('');

  
  

  
  const storeNickname = async (nickname) => {
    try {
      const objData = { nickname: nickname };
      const searchResult = await api.get('/users/:nickname', objData)
      if (searchResult.message !== "User not found") {
        setNickname(nickname)
      } else {
        const createUserResponse = await api.post('/users/',null, objData);
        setNickname(createUserResponse.data.nickname)
      }
      return true;
    } catch (e) {
      console.error('Error al guardar el nombre de usuario:', e);
      return false;
    }
  };

  
  const handlePage = async () => {
    const success = await storeNickname(nickname);
    if (success) {
      navigation.navigate('RankList', { nickname: nickname });
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
