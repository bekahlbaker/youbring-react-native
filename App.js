import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';
import Login from './src/containers/Login/index';

/* eslint-disable react/jsx-filename-extension, react/prop-types */

const Dashboard = () => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#67809F',
    }}
  >
    <Text>Dashboard</Text>
  </View>
);

const RootNavigator = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      headerTitle: 'Dashboard',
    },
  },
});

export default RootNavigator;
