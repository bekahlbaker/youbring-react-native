import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// SplashScreen
import SplashScreen from './containers/splashscreen';

// Stack Navigator
import SignUp from './containers/signUp';
import SignIn from './containers/signIn';

// Tab Navigator
import Dashboard from './containers/dashboard';
import AddEditEvent from './containers/addEditEvent';
import Details from './containers/eventDetails';

import Contacts from './containers/contacts';
import AddEditContact from './containers/addEditContact';

import Profile from './containers/profile';

/* eslint-disable react/jsx-filename-extension, react/prop-types */

const EventsStack = StackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  Details: {
    screen: Details,
  },
  AddEditEvent: {
    screen: AddEditEvent,
  },
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
});

const ContactsStack = StackNavigator({
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  AddEditContact: {
    screen: AddEditContact,
  },
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
});

export const SignedIn = TabNavigator({
  Dashboard: {
    screen: EventsStack,
    navigationOptions: {
      tabBarLabel: 'Events',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-calendar' : 'ios-calendar-outline'}
          size={30}
          color={tintColor}
        />
      ),
    },
  },
  Contacts: {
    screen: ContactsStack,
    navigationOptions: {
      tabBarLabel: 'Contacts',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-people' : 'ios-people-outline'}
          size={30}
          color={tintColor}
        />
      ),
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-body' : 'ios-body-outline'}
          size={30}
          color={tintColor}
        />
      ),
    },
  },
}, {
  tabBarOptions: {
    tabBarPosition: 'bottom',
    activeTintColor: '#22313F',
    inactiveTintColor: '#76838F',
    showIcon: true,
    lazy: true,
    style: {
      backgroundColor: '#E4EAEC',
    },
  },
});

export const SignedOut = StackNavigator(
  {
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
      gesturesEnabled: false,
    },
  },
);

// Main Navigator that contains all main stacks
export const MainNavigator = StackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
    },
    SignedIn: {
      screen: SignedIn,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    SignedOut: {
      screen: SignedOut,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);
