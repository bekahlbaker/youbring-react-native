import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// SplashScreen
import SplashScreen from './containers/splashscreen';

// Stack Navigator
import SignUp from './containers/signUp';
import SignIn from './containers/signIn';
import LoggingIn from './containers/loggingIn';

// Tab Navigator
import Dashboard from './containers/dashboard';

import Details from './containers/eventDetails';

/* eslint-disable react/jsx-filename-extension, react/prop-types */

const EventsStack = StackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      headerTitle: 'Home',
      gesturesEnabled: false,
      headerBackTitle: null,
    },
  },
  Details: {
    screen: Details,
  },
}, {
  navigationOptions: {
    headerTintColor: '#FFFFFF',
    headerStyle: {
      backgroundColor: '#22313F',
    },
  },
});

export const SignedIn = TabNavigator({
  Dashboard: {
    screen: EventsStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
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

// Creates a StackNavigator with a Tab and Stack
// and sets initial route based on wether the user is signed in
export const createRootNavigator = (initialScreen) => {
  return StackNavigator(
    {
      SplashScreen: {
        screen: SplashScreen,
      },
      LoggingIn: {
        screen: LoggingIn,
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
      initialRouteName: initialScreen,
    },
  );
};
