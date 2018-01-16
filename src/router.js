import { StackNavigator, TabNavigator } from 'react-navigation';
// SplashScreen
import SplashScreen from './containers/splashscreen';

// Stack Navigator
import SignUp from './containers/signUp';
import SignIn from './containers/signIn';

// Tab Navigator
import Dashboard from './containers/dashboard';

import Details from './containers/eventDetails';

/* eslint-disable react/jsx-filename-extension, react/prop-types */

const EventsStack = StackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
    },
    Details: {
      screen: Details,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export const SignedIn = TabNavigator({
  Dashboard: {
    screen: EventsStack,
  },
}, {
  tabBarOptions: {
    initialRouteName: 'history',
    tabBarPosition: 'bottom',
    activeTintColor: 'blue',
    inactiveTintColor: '#999999',
    showIcon: true,
    lazy: true,
    style: {
      backgroundColor: '#DEDEDE',
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
