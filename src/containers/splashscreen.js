import React, { Component } from 'react';
import { AsyncStorage, StatusBar } from 'react-native';
import { Text, Container } from 'native-base';
import * as Keychain from 'react-native-keychain';
import { connect } from 'react-redux';
import { emailAuth } from '../actions/auth.actions';
import fonts from '../GLOBAL_STYLES/FONTS';
import colors from '../GLOBAL_STYLES/COLORS';
import { views, buttons, inputs, text, formStyles } from '../GLOBAL_STYLES/STYLES';

/* eslint-disable react/prop-types, react/jsx-filename-extension */

const splashScreenStyles = {
  welcomeText: [{
    textAlign: 'center',
    color: colors.white,
  }, fonts.extraBold36],
  splashscreenContainer: {
    backgroundColor: colors.navy,
    justifyContent: 'center',
  },
};

class SplashScreen extends Component {
  componentDidMount() {
    Keychain
      .getGenericPassword()
      .then((credentials) => {
        console.log('CREDENTIALS logging in: ', credentials.username);
        if (credentials) {
          const value = {
            email: credentials.username,
            password: credentials.password,
          };
          this.props.emailAuth(value);
        } else {
          setTimeout(() => {
            this.props.navigation.navigate('SignedOut');
          }, 2000);
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    AsyncStorage.getItem('UserIsSignedIn')
      .then((value) => {
        console.log('User is signed in', value);
        if (value === null) {
          if (nextProps.user) {
            setTimeout(() => {
              console.log('Navigating on splash screen');
              this.props.navigation.navigate('SignedIn');
            }, 2000);
          }

          if (nextProps.authError) {
            console.log('Error logging in');
            setTimeout(() => {
              this.props.navigation.navigate('SignedOut');
            }, 2000);
          }
        }
      });
  }

  render() {
    return (
      <Container style={splashScreenStyles.splashscreenContainer}>
        <StatusBar
          barStyle="light-content"
        />
        <Text style={splashScreenStyles.welcomeText}>
        YouBring
        </Text>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    authError: state.authError,
  };
};

export default connect(mapStateToProps, { emailAuth })(SplashScreen);
