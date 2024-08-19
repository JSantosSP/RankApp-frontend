import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import TabBar from '../../Components/Base/TabBar';

const ProfileScreen = ({ navigation,user }) => {

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
  const [newActivities, setNewActivities] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddUser = () => {
    if (newActivity) {
      setUserList([...activities, { name: newActivity, points: 0 }]);
      setNewActivities('');
      setModalVisible(false);
    }
  };

  const renderActivityItem = ({ item }) => (
    <View style={styles.activityCard}>
      <Text style={styles.activityName}>Name: {item.name}</Text>
      <Text style={styles.activityDescription}>Description: {item.description}</Text>
      <Text style={styles.activityScore}>Score: {item.score}</Text>
      <Text style={styles.activityAssigner}>Assigned by: {item.assignerUsername}</Text>
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
            <AntDesign name="adduser" size={24} color="white" />
        </TouchableOpacity>
        {/*tengo que modificar este codigo de Modal para que tenga el selector que he creado como componente y añada el nombre a la lista, tambie añadir los estilos de RankScreen*/}
        {/*Entender porque no se esta pasando el elemento user correctamente*/}
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
                placeholder="Enter username"
                value={newUsername}
                onChangeText={setNewUsername}
                />
                <Button title="Add" onPress={handleAddUser} color="#002fcd" />
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
  activityAssigner: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 5,
  },
});

export default ProfileScreen;
