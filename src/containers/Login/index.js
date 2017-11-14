import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';
import YBButton from '../../components/YBButton';
import YBInput from '../../components/YBInput';
import styles from './styles';

/* eslint-disable react/jsx-filename-extension, react/prop-types, jsx-quotes */

class Login extends Component {
  constructor(navigation) {
    super(navigation);

    this.state = {
      hasAccount: true,
      email: '@',
      password: '',
      password2: '',
      errorMessage: 'Error Message',
    };
  }

  handleLogin = () => {
    console.log(this.state.email);
    if (!this.state.email.includes('@')) {
      this.setState({ errorMessage: 'Please enter a valid email address.'});
    } else {
      this.props.navigation.navigate('Dashboard')
    }
  }

  handleSignUp = () => {
    this.props.navigation.navigate('Dashboard')
  }

  toggleHasAccount = () => {
    this.setState({ hasAccount: !this.state.hasAccount });
  };

  renderErrorMessage() {
    if (this.state.errorMessage) {
      return(
        <View>
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        </View>
      );
    }
  }

  renderPasswordInput() {
    if (!this.state.hasAccount) {
      return (
        <View>
          <YBInput
            placeholder='Password'
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <YBInput
            placeholder='Confirm password'
            value={this.state.password2}
            onChangeText={(password2) => this.setState({ password2 })}
          />
        </View>
      );
    }
    return (
      <YBInput
        placeholder='Password'
      />
    );
  }

  render() {
    return (
      <View style={styles.mainView}>
        <View>
          <Text style={styles.logo}>YouBring</Text>
        </View>
        <View style={styles.loginForm}>
          <YBInput
            placeholder='Email'
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
        {this.renderPasswordInput()}
          <YBButton
            title={this.state.hasAccount ? 'Login' : 'Sign Up'}
            onPress={() => this.state.hasAccount ? this.handleLogin() : this.handleSignUp()}
          />
          {this.renderErrorMessage()}
          <TouchableOpacity
            onPress={() => this.toggleHasAccount()}
            style={styles.toggleHasAccountButton}
          >
          <Text style={{ color: 'blue' }}>{!this.state.hasAccount ? 'Already have an account?' : 'Want to create an account?'}</Text>
          </TouchableOpacity>
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
