import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import { Content, View, Button, Text, Container } from 'native-base';
import t from 'tcomb-form-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import { newUser, facebookAuth } from '../actions/auth.actions';
import styles from '../GLOBAL_STYLES';

/* eslint-disable react/prop-types, react/jsx-filename-extension, class-methods-use-this */

const signUpStyles = {
  logo: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  termsOfUseRow: {
    marginTop: 20,
    justifyContent: 'center',
  },
  loginRow: {
    marginTop: 20,
    justifyContent: 'center',
  },
  loginButton: {
    marginLeft: 8,
  },
  ORview: {
    padding: 20,
  },
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {},
      emailHasError: false,
      emailError: '',
    };

    this.email = t.refinement(t.String, (email) => {
      const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return reg.test(email);
    });

    this.password = t.refinement(t.String, password => password.length >= 6);

    this.confirmPassword = t.refinement(t.String, confirmPassword =>
      confirmPassword === this.state.value.password);

    this.User = t.struct({
      firstName: t.String,
      lastName: t.String,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  componentWillReceiveProps(nextProps) {
    AsyncStorage.getItem('UserIsSignedIn')
      .then((value) => {
        console.log(value);
        if (value === null) {
          if (nextProps.user) {
            this.props.navigation.navigate('SignedIn');
          }

          if (nextProps.authError) {
            this.setState({ emailHasError: true, emailError: nextProps.authError });
          }
        }
      });
  }

  onChange(value) {
    this.setState({ value });
  }

  handleSignInButton() {
    this.props.navigation.navigate('SignIn');
  }

  handleSignUpWithFacebookButton() {
    // Attempt a login using the Facebook login dialog asking for default permissions.

    LoginManager.logInWithReadPermissions(['public_profile']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('Login with facebook was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            AsyncStorage.setItem('UserIsSignedIn', 'true');
            console.log('DATA ', data);
            console.log('ACCESS TOKEN ', data.accessToken);
            this.props.facebookAuth(data.accessToken);
          });
        }
      },
      (error) => {
        console.log(`Login fail with error: ${error}`);
      },
    );
  }

  handleSignUpButton() {
    AsyncStorage.setItem('UserIsSignedIn', 'true');
    const value = this.form.getValue();
    if (value) {
      console.log('value: ', value);
      this.props.newUser(value);
    }
  }

  render() {
    const formOptions = {
      fields: {
        firstName: {
          label: 'First Name',
          error: 'Please enter your first name',
        },
        lastName: {
          label: 'Last Name',
          error: 'Please enter your last name',
        },
        email: {
          hasError: this.state.emailHasError,
          error: this.state.emailError ? this.state.emailError : 'Please enter a valid email address.',
        },
        username: {
          error: 'Please choose a username.',
        },
        password: {
          error: 'Password needs to be at least 6 characters.',
          password: true,
          secureTextEntry: true,
        },
        confirmPassword: {
          label: 'Confirm Password',
          error: 'Please make sure passwords match.',
          password: true,
          secureTextEntry: true,
        },
      },
      stylesheet: styles.formStyles,
    };

    return (
      <Container style={styles.container} >
        <Content
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >

          <Text style={styles.logoText}>YouBring</Text>

          <View style={styles.view}>
            <t.form.Form
              ref={c => this.form = c}
              type={this.User}
              options={formOptions}
              value={this.state.value}
              onChange={value => this.onChange(value)}
            />
          </View>

          <View style={signUpStyles.ORview}>
            <Text style={styles.gray13Text}>OR</Text>
          </View>

          <Button style={styles.facebookButton}onPress={() => this.handleSignUpWithFacebookButton()}>
            <Text style={styles.facebookButtonText}>Sign Up With Facebook</Text>
          </Button>

          <Button style={styles.orangeButton} onPress={() => this.handleSignUpButton()}>
            <Text style={styles.orangeButtonText}>Sign Up</Text>
          </Button>

          <View style={[styles.rowView, signUpStyles.termsOfUseRow]}>
            <Text style={styles.gray13Text}>By signing up, you agree to the </Text>
            <TouchableOpacity
              onPress={this.handleRegisterHereButton}
            >
              <Text style={[styles.buttonTextOnly]}>Terms of Use</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.rowView, signUpStyles.loginRow]}>
            <Text style={styles.gray13Text}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => this.handleSignInButton()}
            >
              <Text style={[styles.buttonTextOnly, signUpStyles.loginButton]}>
                Login Here
              </Text>
            </TouchableOpacity>
          </View>
        </Content>
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

export default connect(mapStateToProps, { newUser, facebookAuth })(SignUp);
