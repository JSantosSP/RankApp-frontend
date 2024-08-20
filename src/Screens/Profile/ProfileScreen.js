import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TabBar from '../../Components/Base/TabBar';
import ListActivities from '../../Components/ListActivities/ListActivities';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation, route }) => {
  const { user } = route.params || {};
  
  if (!user) {
    return (
        <TabBar navigation={navigation}>      
            <View style={styles.container}>
                <Text style={styles.errorText}>No user data available.</Text>
            </View>
        </TabBar>
    );
  }

  const [activities, setActivities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
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

  const handleAddActivity = (newActivity) => {
    if (newActivity) {
      const formData = {
        name: newActivity,
        description: 'texto de ejemplo',
        fecha: dayjs().format('DD-MM-YYYY'),
        score: 10,
        assignerUsername: username,
      };
      setActivities([...activities, formData]);
      setModalVisible(false);
    }
  };

  const handleRemoveActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const renderActivityItem = ({ item, index }) => (
    <View style={styles.activityCard}>
      <Text style={styles.activityName}>Name: {item.name}</Text>
      <Text style={styles.activityDescription}>Description: {item.description}</Text>
      <Text style={styles.activityScore}>Score: {item.score}</Text>
      <Text style={styles.activityDate}>Date: {item.fecha}</Text>
      <Text style={styles.activityAssigner}>Assigned by: {item.assignerUsername}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveActivity(index)}>
        <AntDesign name="delete" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <TabBar navigation={navigation}>
        <View style={styles.container}>
        <Text style={styles.title}>Profile Details</Text>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Points:</Text>
        <Text style={styles.value}>{user.points}</Text>

        <Text style={styles.label}>Activities:</Text>
        {activities && activities.length > 0 ? (
            <FlatList
            data={activities}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderActivityItem}
            contentContainerStyle={styles.activitiesContainer}
            />
        ) : (
            <Text style={styles.value}>No activities available</Text>
        )}
        </View>
        <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
            <AntDesign name="addfile" size={24} color="white" />
        </TouchableOpacity>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add Activity</Text>
                <ListActivities onSelect={handleAddActivity}/>
                <Button title="Cancel" onPress={() => setModalVisible(false)} color="#cd0000" />
            </View>
            </View>
        </Modal>
    </TabBar>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  activitiesContainer: {
    marginTop: 10,
  },
  activityCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
  },
  activityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  activityScore: {
    fontSize: 14,
    color: '#333',
  },
  activityDate: {
    fontSize: 14,
    color: '#333',
  },
  activityAssigner: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#cd0000',
    padding: 5,
    borderRadius: 5,
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});

export default ProfileScreen;
