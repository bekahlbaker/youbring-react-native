import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as Keychain from 'react-native-keychain';
import reducers from './src/reducers';
import SplashScreen from './src/containers/splashscreen';
import { createRootNavigator } from './src/router';


/* eslint-disable react/jsx-filename-extension, react/prop-types */

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);

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
          console.log('User is signed in, go to Home screen');
          setTimeout(() => {
            this.setState({ signedIn: true }, () => console.log('SIGNED IN: ', this.state.signedIn));
          }, 2000);
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
    if (this.state.signedIn === null) {
      return <SplashScreen />;
    }

    const Layout = createRootNavigator(this.state.signedIn);

    return (
      <Provider store={createStoreWithMiddleWare(reducers)}>
        <Layout />
      </Provider>
    );
  }
}

export default App;
