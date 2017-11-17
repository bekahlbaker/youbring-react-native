import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Login from './src/containers/Login/index';
import Dashboard from './src/containers/Dashboard/index';
import Settings from './src/containers/Settings/index';

/* eslint-disable react/jsx-filename-extension, react/prop-types */

const RootNavigator = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Dashboard: {
    screen: Dashboard,
  },
  Settings: {
    screen: Settings,
  },
});

export default RootNavigator;
