import React, { Component } from 'react';
import { Text, Container } from 'native-base';
import { connect } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import { emailAuth } from '../actions/auth.actions';
import fonts from '../FONTS';
import colors from '../COLORS';

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

class LoggingIn extends Component {

  componentWillMount() {
    Keychain
      .getGenericPassword()
      .then((credentials) => {
        console.log('CREDENTIALS: ', credentials.username);
        if (credentials) {
          const value = {
            email: credentials.username,
            password: credentials.password,
          };
          this.props.emailAuth(value);
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      console.log('Success logging in');
      this.props.navigation.navigate('SignedIn');
    }

    if (nextProps.authError) {
      console.log('Error logging in');
      this.props.navigation.navigate('SignedOut');
    }
  }

  render() {
    return (
      <Container style={splashScreenStyles.splashscreenContainer}>
        <Text style={splashScreenStyles.welcomeText}>
        Welcome to YouBring!
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

export default connect(mapStateToProps, { emailAuth })(LoggingIn);
