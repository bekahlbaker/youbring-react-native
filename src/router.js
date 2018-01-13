import { StackNavigator, TabNavigator } from 'react-navigation';

// Stack Navigator
import SignUp from './containers/signUp';
import SignIn from './containers/signIn';

// Tab Navigator
import Home from './containers/dashboard';

/* eslint-disable react/jsx-filename-extension, react/prop-types */

export const SignedIn = TabNavigator({
  Home: {
    screen: Home,
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
export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
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
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
    },
  );
};
