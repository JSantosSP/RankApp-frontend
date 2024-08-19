import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import TabBar from '../../Components/Base/TabBar';

const RankListScreen = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [rank, setRank] = useState([]);

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

      const fetchRank = async () => {
        try {
          const storedRank = await AsyncStorage.getItem('@rank');
          if (storedRank !== null) {
            const updatedRank = [...rank, JSON.parse(storedRank)];
            setRank(updatedRank);
          }
        } catch (e) {
          console.error('Error al recuperar el rank del usuario:', e);
        }
      };

      fetchUsername();
      fetchRank();
    }, [])
  );

  const handleRankPress = (item) => {
    navigation.navigate('Rank', { rank: item });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    card: {
      backgroundColor: '#f8f8f8',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    cardText: {
      fontSize: 16,
      color: '#333',
    },
  });

  return (
    <TabBar navigation={navigation}>
      <View style={styles.container}>
        {rank.length > 0 ? (
          rank.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.card} 
              onPress={() => handleRankPress(item)} // Al presionar, navega a RankScreen con el objeto rank correspondiente
            >
              <Text style={styles.cardText}>Rank Name: {item.name}</Text>
              <Text style={styles.cardText}>Points: 0</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.cardText}>No ranks available</Text>
        )}
      </View>
    </TabBar>
  );
};

export default RankListScreen;
