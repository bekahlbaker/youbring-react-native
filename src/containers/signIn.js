import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import { Content, View, Button, Text, Container } from 'native-base';
import { CheckBox } from 'react-native-elements';
import t from 'tcomb-form-native';
import * as Keychain from 'react-native-keychain';
import { connect } from 'react-redux';
import { emailAuth } from '../actions/auth.actions';
import fonts from '../GLOBAL_STYLES/FONTS';
import colors from '../GLOBAL_STYLES/COLORS';
import { views, buttons, inputs, text, formStyles } from '../GLOBAL_STYLES/STYLES';

/* eslint-disable react/prop-types, react/jsx-filename-extension */

const signInStyles = {
  logo: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  forgotPasswordRow: {
    justifyContent: 'space-between',
    marginTop: 0,
    marginBottom: 130,
    marginLeft: -20,
  },
  registerHereRow: {
    marginTop: 20,
    justifyContent: 'center',
  },
  registerHereButton: {
    marginLeft: 8,
  },
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        email: 'bekah@gmail.com',
        password: 'password',
      },
      checked: false,
      emailHasError: false,
      emailError: null,
      passwordHasError: false,
      passwordError: null,
    };

    this.User = t.struct({
      email: t.String,
      password: t.String,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userStatus === 'EMAIL_AUTH') {
      console.log('Navigating on sign in');
      this.props.navigation.navigate('SignedIn');
    }

    if (nextProps.authError) {
      if (nextProps.authError === 'User not found!') {
        this.setState({ emailHasError: true, emailError: 'User not found. Do you need to create an account?' });
      } else if (nextProps.authError === 'Incorrect password') {
        this.setState({ passwordHasError: true, passwordError: 'Did you forget your password?' });
      }
    }
  }

  onChange(value) {
    this.setState({ value });
  }

  handleCheckButton() {
    this.setState({ checked: !this.state.checked }, () => {
      if (this.state.checked) {
        if (this.state.value.email && this.state.value.password) {
          Keychain
            .setGenericPassword(this.state.value.email, this.state.value.password)
            .then(() => {
              console.log('Credentials saved!');
            })
            .catch((err) => {
              console.log(`Could not save credentials ${err}`);
            });
        }
      } else {
        Keychain
          .resetGenericPassword()
          .then(() => {
            console.log('Credentials successfully deleted');
          });
      }
    });
  }

  handleRegisterHereButton() {
    this.props.navigation.navigate('SignUp');
  }

  handleSignInButton() {
    AsyncStorage.setItem('UserIsSignedIn', 'true');
    const value = this.form.getValue();
    if (value) {
      console.log('value: ', value);
      this.props.emailAuth(value);
    }
  }

  render() {
    const formOptions = {
      fields: {
        email: {
          hasError: this.state.emailHasError,
          error: this.state.emailError,
        },
        password: {
          hasError: this.state.passwordHasError,
          error: this.state.passwordError,
          password: true,
          secureTextEntry: true,
        },
      },
      stylesheet: formStyles,
    };
    return (
      <Container style={views.container} >
        <Content
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={views.scrollView}
        >

          <Text style={text.logoText}>YouBring</Text>

          <View>
            <t.form.Form
              ref={c => this.form = c}
              type={this.User}
              options={formOptions}
              value={this.state.value}
              onChange={value => this.onChange(value)}
            />
          </View>

          <View style={[views.rowView, signInStyles.forgotPasswordRow]}>
            <CheckBox
              title="Remember me"
              checked={this.state.checked}
              containerStyle={inputs.checkBox}
              textStyle={text.gray13Text}
              onPress={() => this.handleCheckButton()}
              size={20}
              checkedColor={colors.orange}
            />

            <TouchableOpacity>
              <Text style={[buttons.buttonTextOnly, { marginTop: 8 }]}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <Button style={buttons.orangeButton} onPress={() => this.handleSignInButton()}>
            <Text style={buttons.orangeButtonText}>Login</Text>
          </Button>

          <View style={[views.rowView, signInStyles.registerHereRow]}>
            <Text style={text.gray13Text}>Dont have an account?</Text>
            <TouchableOpacity
              onPress={() => this.handleRegisterHereButton()}
            >
              <Text style={[buttons.buttonTextOnly, signInStyles.registerHereButton]}>
                Register Here
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
    userStatus: state.userStatus,
  };
};

export default connect(mapStateToProps, { emailAuth })(SignIn);
