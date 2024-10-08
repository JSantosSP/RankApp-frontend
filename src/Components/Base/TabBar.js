import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

const TabBar = ({ navigation, children, route }) => {
  const [activeKey, setActiveKey] = useState('RankList');

  const handlePage = (page) => {
    setActiveKey(page);
    navigation.navigate(page, route);
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
    tabBar: {
      flexDirection: 'row',
      height: 60,
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      backgroundColor: '#fff',
    },
    tabBarItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginBottom: 4,
    },
    activeText: {
      color: '#007AFF',
    },
    inactiveText: {
      color: '#333',
    },
  });

  const tabs = [
    {
      key: 'RankList',
      title: 'RankList',
      icon: 'bars',
    },
    {
      key: 'CreateRank',
      title: 'New Rank',
      icon: 'pluscircleo',
    }
  ];

  return (
    <View style={styles.container}>
        
      <View style={styles.content}>
        {children}
      </View>

      <View style={styles.tabBar}>
        {tabs.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.tabBarItem}
            onPress={() => handlePage(item.key)}
          >
            <AntDesign
              name={item.icon}
              size={24}
              color={activeKey === item.key ? '#007AFF' : '#333'}
              style={styles.icon}
            />
            <Text style={activeKey === item.key ? styles.activeText : styles.inactiveText}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TabBar;
