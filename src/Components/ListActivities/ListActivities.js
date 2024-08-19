import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ListActivities = ({ onSelect, rank }) => {
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Función que pedira las actividades del rank
  const generateWordsList = () => {
    return ['john_doe', 'jane_smith', 'johanna', 'jake', 'jules', 'jackson', 'julie', 'jerry', 'joyce', 'jacob'];
  };

  const handleInputChange = (text) => {
    setQuery(text);

    if (text.length >= 3) {
      const userList = generateWordsList();
      const matches = userList.filter(user =>
        user.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(matches);
      setShowDropdown(true);
    } else {
      setFilteredUsers([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (username) => {
    setQuery(username);
    setShowDropdown(false);
    onSelect(username);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type a username"
        value={query}
        onChangeText={handleInputChange}
      />
      {showDropdown && (
        <FlatList
          data={filteredUsers.length > 0 ? filteredUsers : [{ name: `"${query}" (Add new)` }]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item.name || query)}>
              <Text style={styles.dropdownItem}>{item.name || `"${query}" (Add new)`}</Text>
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
