import React, { Component } from 'react';
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';
import YBButton from '../../components/YBButton';
import styles from './styles';

/* eslint-disable react/jsx-filename-extension */

class Login extends Component {
  constructor(navigation) {
    super(navigation);

    this.state = {
      hasAccount: false,
    };
  }

  render() {
    return (
      <View style={styles.mainView}>
        <View>
          <Text style={styles.logo}>YouBring</Text>
        </View>
        <View style={styles.loginForm}>
          <YBButton
            title={this.state.hasAccount ? 'Login' : 'Sign Up'}
            onPress={() => this.props.navigation.navigate('Dashboard')}
          />
          <YBButton
            title='Login with Facebook'
            color='#6882BD'
          />
        </View>
      </View>
    );
  }
}

export default Login;
