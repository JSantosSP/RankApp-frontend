import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import TabBar from '../../Components/Base/TabBar';

const CreateRankListScreen = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fechaIni, setFechaIni] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [reward, setReward] = useState('');
  const [showDateIniPicker, setShowDateIniPicker] = useState(false);
  const [showDateFinPicker, setShowDateFinPicker] = useState(false);
  const [rank, setRank] = useState('');

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

  const createObject = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El campo "Name" es obligatorio.');
      return;
    }

    if (!fechaIni) {
      Alert.alert('Error', 'El campo "First Day" es obligatorio.');
      return;
    }

    if (!fechaFin) {
      Alert.alert('Error', 'El campo "Last Day" es obligatorio.');
      return;
    }

    const formData = {
      name,
      description,
      fechaIni: dayjs(fechaIni).format('DD-MM-YYYY'),
      fechaFin: dayjs(fechaFin).format('DD-MM-YYYY'),
      reward,
      username,
    };
    return JSON.stringify(formData, null, 2);
  };

  const storeRank = async (rank) => {
    try {
      //añadir codigo para guardar el ranking en la base de datos
      await AsyncStorage.setItem('@rank', rank);
    } catch (e) {
      console.error('Error al guardar el ranking:', e);
    }
  };

  const handleCreate = async () => {
    const newRank = createObject();
    setRank(newRank);

    setTimeout(async () => {
      await storeRank(newRank);
      Alert.alert('Form Data', newRank); 
      navigation.navigate('RankList');
    }, 0);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    textArea: {
      height: 80,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      textAlignVertical: 'top',
    },
    label: {
      marginBottom: 5,
      fontWeight: 'bold',
    },
    dateText: {
      paddingVertical: 10,
      color: '#333',
    },
  });

  return (
    <TabBar navigation={navigation}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder='Ranking name'
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textArea}
        placeholder='Texto para explicar de qué va el ranking (opcional)'
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>First Day</Text>
      <Text style={styles.dateText} onPress={() => setShowDateIniPicker(true)}>
        {dayjs(fechaIni).format('DD-MM-YYYY')}
      </Text>
      {showDateIniPicker && (
        <DateTimePicker
          value={fechaIni}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDateIniPicker(false);
            if (selectedDate) {
              setFechaIni(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.label}>Last Day</Text>
      <Text style={styles.dateText} onPress={() => setShowDateFinPicker(true)}>
        {dayjs(fechaFin).format('DD-MM-YYYY')}
      </Text>
      {showDateFinPicker && (
        <DateTimePicker
          value={fechaFin}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDateFinPicker(false);
            if (selectedDate) {
              setFechaFin(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.label}>Reward</Text>
      <TextInput
        style={styles.input}
        placeholder='Premio para el ganador'
        value={reward}
        onChangeText={setReward}
      />

      <Text style={styles.label}>Creator</Text>
      <TextInput
        style={styles.input}
        value={username}
        editable={false}
      />

      <Button title="Create" onPress={handleCreate} color="#007AFF" />
      <StatusBar style="auto" />
    </TabBar>
  );
};

export default CreateRankListScreen;
