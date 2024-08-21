import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import api from '../../Utils/api';

const ListActivities = ({ onSelect, route }) => {
  const { rank } = route.params || {};
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  
  const generateWordsList = async () => {
    try {
      const objParams = {id: rank.ranking_id}
      const res = await api.get('activity/rankings/:id', objParams)
      return res.data.activities
    } catch (error) {
      console.log(error)
    }
  };

  const handleInputChange = (text) => {
    setQuery(text);

    if (text.length >= 1) {
      const userList = generateWordsList();
      const matches = userList.filter(user =>
        user.toLowerCase().includes(text.toLowerCase())
      ).map(user => ({ name: user }));  

      if (matches.length === 0) {
        setFilteredUsers([{ name: `"${text}" (Add new)` }]);
      } else {
        const exactMatch = matches.some(user => user.name.toLowerCase() === text.toLowerCase());
        if (!exactMatch) {
          matches.push({ name: `"${text}" (Add new)` });
        }
        setFilteredUsers(matches);
      }

      setShowDropdown(true);
    } else {
      setFilteredUsers([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (nickname) => {
    const finalNickname = nickname.includes('(Add new)') ? query : nickname;
    setQuery(finalNickname);
    setShowDropdown(false);
    onSelect(finalNickname);
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
            <TouchableOpacity onPress={() => handleSelect(item.name)}>
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
