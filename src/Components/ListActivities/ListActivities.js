import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ListActivities = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Función que generará la lista de actividades del rank (simulada aquí)
  const generateWordsList = () => {
    return [
      'john_doe', 
      'jane_smith', 
      'johanna', 
      'jake', 
      'jules', 
      'jackson', 
      'julie', 
      'jerry', 
      'joyce', 
      'jacob'
    ];
  };

  const handleInputChange = (text) => {
    setQuery(text);

    if (text.length >= 1) {
      const userList = generateWordsList();
      const matches = userList.filter(user =>
        user.toLowerCase().includes(text.toLowerCase())
      ).map(user => ({ name: user }));  // Mapear a objetos con una propiedad 'name'

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
