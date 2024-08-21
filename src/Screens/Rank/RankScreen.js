import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Alert, Button, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import api from '../../Utils/api';

const RankScreen = ({ navigation, route }) => {
  const { rank, nickname } = route.params || {}; 
  const [rankData, setRankData] = useState(rank || {});
  const [modalVisible, setModalVisible] = useState(false);
  const [newNickname, setNewNickname] = useState('');

  if (!rankData) {
    return (
      <View>      
        <View style={styles.container}>
          <Text style={styles.errorText}>No rank data available.</Text>
        </View>
      </View>
    );
  }

  const handleAddUser = async () => {
    if (newNickname) {
      const objData = {id: rankData.id, nickname: nickname};
      try {
        const res = await api.post(`/rankings/:id/users/:nickname`, objData, {nickname:newNickname});
        if(res.message !== "nickname not found"){
          setRankData((prevRankData) => ({
            ...prevRankData,
            users: res.data,
          }));
        }
        else{
          Alert.alert('Error', 'nickname not found');
        }
        setNewNickname('');
        setModalVisible(false);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const renderHeader = () => (
    <View style={styles.rankDetails}>
      <Text style={styles.title}>Ranking Details</Text>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{rankData.name}</Text>

      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{rankData.description || 'No description provided'}</Text>

      <Text style={styles.label}>First Day:</Text>
      <Text style={styles.value}>{rankData.fechaIni}</Text>

      <Text style={styles.label}>Last Day:</Text>
      <Text style={styles.value}>{rankData.fechaFin}</Text>

      <Text style={styles.label}>Reward:</Text>
      <Text style={styles.value}>{rankData.reward || 'No reward specified'}</Text>

      <Text style={styles.label}>Participants:</Text>
    </View>
  );

  const searchData = async (user) => {
    try {
      const objParams = {id:rank.id, nickname: user.usuario_nickname}
      const newData = await api.get('rankings/:id/users/:nickname/activities', objParams)
      if (newData !== null) {
        return newData;
      }
      else{
        return {error:"error to search"}
      }
      
    } catch (e) {
      console.error('Error al recuperar el nombre de usuario:', e);
    }
  };
  const handleParticipantPress = async (user) => {
    try {
      const data = await searchData(user);
      const obj = { user: user, rank: rankData, dataOld: data.data, nickname: nickname }
      navigation.navigate('Profile',obj);
    } catch (error) {
      console.error('Error obteniendo los datos:', error);
      
    }
  };

  return (
  <View style={styles.container}>
    <View style={styles.content}>
      <FlatList
        data={rankData.users}
        ListHeaderComponent={renderHeader}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleParticipantPress(item)}>
            <View style={styles.participantCard}>
              <Text style={styles.participantName}>{item.usuario_nickname}</Text>
              <Text style={styles.participantPoints}>Points: {item.score}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.value}>No participants added</Text>}
        contentContainerStyle={styles.container2}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <AntDesign name="adduser" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.activityFab}
        onPress={() => navigation.navigate('CreateActivity', {rank: rankData, nickname:nickname})}
      >
        <MaterialIcons name="star" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Participant</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter nickname"
              value={newNickname}
              onChangeText={setNewNickname}
            />
            <Button title="Add" onPress={handleAddUser} color="#002fcd" />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="#cd0000" />
          </View>
        </View>
      </Modal>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  rankDetails: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  fab: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  activityFab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#FF5722',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  participantCard: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  participantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  participantPoints: {
    fontSize: 14,
    color: '#666',
  },
});

export default RankScreen;
