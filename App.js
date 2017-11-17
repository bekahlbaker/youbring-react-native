import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Login from './src/containers/Login/index';
import Dashboard from './src/containers/Dashboard/index';
import Details from './src/containers/Details/index';
import Settings from './src/containers/Settings/index';
import Create from './src/containers/Create/index';
import Contacts from './src/containers/Contacts/index';
import colors from './src/global/colors';

/* eslint-disable react/jsx-filename-extension, react/prop-types */

const RootTabs = TabNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: 'Events',
      tabBarIcon: () => <Icon name="home" size={26} />,
      activeTintColor: colors.darkTextColor,
      inactiveTintColor: colors.placeholderTextColor,
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <Icon name="settings" size={26} color={tintColor} />,
    },
  },
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      tabBarLabel: 'Contacts',
      tabBarIcon: ({ tintColor }) => <Icon name="contacts" size={26} color={tintColor} />,
    },
  },
});

export const RootNavigator = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Dashboard: {
    screen: RootTabs,
  },
  Settings: {
    screen: Settings,
  },
  Details: {
    screen: Details,
  },
  Create: {
    screen: Create,
  },
  Contacts: {
    screen: Contacts,
  },
});

export default RootNavigator;
