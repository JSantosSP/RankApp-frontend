import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import api from '../../Utils/api';
import { useFocusEffect } from '@react-navigation/native';

const ListActivities = ({ onSelect, rank, nickname }) => {
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  
  
  useFocusEffect(
    React.useCallback(() => {
      const generateWordsList = async () => {
        try {
          const objParams = {id: rank.id}
          
          const res = await api.get('activity/rankings/:id', objParams)
          setActivitiesList(res.data)
        } catch (error) {
          console.log(error)
        }
      };
      generateWordsList();
    }, [])
  );


  const handleInputChange = (text) => {
    setQuery(text);
  
    if (text.length >= 1) {
      
      const matches = activitiesList.filter(activity =>
        activity.name.toLowerCase().includes(text.toLowerCase())
      );

      if (matches.length !== 0) {
        setFilteredUsers(matches);
      } else {
        setFilteredUsers([]); 
      }
  
      setShowDropdown(true);
    } else {
      setFilteredUsers([]); 
      setShowDropdown(false);
    }
  };

  const handleSelect = async (activity) => {
    const exists = activitiesList.some(item => item === activity);
  
    if (exists) {
      onSelect(activity);
    } else {
      Alert.alert(
        'Actividad no encontrada',
        `La actividad "${activity}" no existe en la lista.`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type an activity name"
        value={query}
        onChangeText={handleInputChange}
      />
      {showDropdown && (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text style={styles.dropdownItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderTopWidth: 0,
    borderRadius: 5,
    maxHeight: 150,
    marginTop: 2,
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    fontSize: 16,
  },
});

export default ListActivities;
