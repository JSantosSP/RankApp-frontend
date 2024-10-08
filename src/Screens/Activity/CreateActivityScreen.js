import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import api from '../../Utils/api';

const CreateActivityScreen = ({ navigation, route }) => {
  const { rank } = route.params || {};
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [score, setScore] = useState(50);

  const handleSubmit = async () => {
    if (!name || !description) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    try{
      const objBody = {
        name: name,
				description: description,
				score: score,
				id_rank: rank.id
      }
      const res = await api.post('/activity', null, objBody)
      Alert.alert('Success', JSON.stringify(res.data));
      navigation.goBack();
    }
    catch(err){
      console.log(err)
    }
  };

  return (
  <View style={styles.container}>
      
  <View style={styles.content}>
    <ScrollView contentContainerStyle={styles.container2}>
      <Text style={styles.title}>Create New Activity</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter activity name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter activity description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Score:</Text>
        <Text style={styles.scoreValue}>{score}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={100}
          step={1}
          value={score}
          onValueChange={setScore}
          minimumTrackTintColor="#007AFF"
          maximumTrackTintColor="#CCCCCC"
          thumbTintColor="#007AFF"
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Activity</Text>
      </TouchableOpacity>
    </ScrollView>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateActivityScreen;
