import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as Keychain from 'react-native-keychain';
import reducers from './src/reducers';
import { createRootNavigator } from './src/router';


/* eslint-disable react/jsx-filename-extension, react/prop-types */

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleWare(reducers);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: null,
    };
    this.checkKeychainForCredentials = this.checkKeychainForCredentials.bind(this);
  }

  /*
    When App launches, shows splashscreen by default
    Check Keychain for credentials - if available attempt to log user in
    If not available, show Sign In screen
  */
  componentWillMount() {
    // -- resets keychain and storage to simulate "First Launch"
    // AsyncStorage.removeItem('AppHasBeenLaunchedOnce');
    // Keychain
    //   .resetGenericPassword()
    //   .then(() => {
    //     console.log('Credentials successfully deleted');
    //   });

    // -- sets credentials
    // Keychain
    //   .setGenericPassword('username', 'password')
    //   .then(() => {
    //     console.log('Credentials saved successfully!');
    //   });
    console.log('Component Will Mount, ', this.state.signedIn);
    this.checkKeychainForCredentials();
  }

  checkKeychainForCredentials() {
    Keychain
      .getGenericPassword()
      .then((credentials) => {
        console.log('CREDENTIALS: ', credentials.username);
        if (credentials) {
          // call login action here and navigate to Home if successful login
          console.log('User is signed in, attempt to Login');
          // Attempt Login
          setTimeout(() => {
            this.setState({ signedIn: true }, () => console.log('SIGNED IN: ', this.state.signedIn));
          }, 1000);
        } else {
          console.log('User is not signed in, go to Sign In screen');
          setTimeout(() => {
            this.setState({ signedIn: false }, () => console.log('SIGNED IN: ', this.state.signedIn));
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(`Could not load credentials. ${err} go to Login screen`);
        this.setState({ signedIn: false }, () => console.log('SIGNED IN: ', this.state.signedIn));
      });
  }

  render() {
    let initialScreen = '';

    if (this.state.signedIn === null) {
      initialScreen = 'SplashScreen';
    } else if (this.state.signedIn === true) {
      initialScreen = 'LoggingIn';
    } else if (this.state.signedIn === false) {
      initialScreen = 'SignedOut';
    }

    const Layout = createRootNavigator(initialScreen);

    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}

export default App;
