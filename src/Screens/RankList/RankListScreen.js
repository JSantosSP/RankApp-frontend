import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import TabBar from '../../Components/Base/TabBar';
import api from '../../Utils/api';


const RankListScreen = ({ navigation, route }) => {
  const { nickname } = route.params || {}; 
  const [rank, setRank] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchRank = async () => {
        try {
          const objData = { nickname: nickname };
          const rankings = await api.get('/users/:nickname/rankings', objData);
          
          if (rankings.message !== "rankings not found") {         
            setRank(rankings.data);
          }
        } catch (e) {
          console.error('Error al recuperar el rank del usuario:', e);
        }
      };
      fetchRank();
    }, [])
  );

  const handleRankPress = async (item) => {
    const objData = {id:item.ranking_id};
    try{
      const ranking = await api.get('/rankings/:id', objData)
      navigation.navigate('Rank', { rank: ranking.data, nickname: nickname });
    }
    catch(error){
      console.log(error.message)
    }
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
              <Text style={styles.cardText}>Points: {item.score}</Text>
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
