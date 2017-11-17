import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
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
    if (!this.state.email.includes('@')) {
      this.setState({ errorMessage: 'Please enter a valid email address.'});
    } else {
      this.props.navigation.navigate('Dashboard')
    }
  }

  handleSignUp = () => {
    if (!this.state.email.includes('@')) {
      this.setState({ errorMessage: 'Please enter a valid email address.'});
    } else if (this.state.password !== this.state.password2) {
      this.setState({ errorMessage: 'Passwords do not match.'})
    } else {
      this.props.navigation.navigate('Dashboard')
    }
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
        <View style={{ paddingTop: 25 }}>
          <YBInput
            secureTextEntry={true}
            placeholder='Password'
          />
        </View>
          <View style={{ paddingTop: 25 }}>
            <YBInput
              secureTextEntry={true}
              placeholder='Confirm password'
            />
          </View>
        </View>
      );
    }
    return (
      <View style={{ paddingTop: 25 }}>
        <YBInput
          secureTextEntry={true}
          placeholder='Password'
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainView}>
        <View>
          <Text style={styles.logo}>YouBring</Text>
        </View>
        <View style={styles.loginForm}>
          <View style={{ paddingTop: 25 }}>
            <YBInput
              placeholder='Email'
            />
          </View>
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
