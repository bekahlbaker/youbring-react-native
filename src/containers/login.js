import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { newUser } from '../actions/auth.actions';

/* eslint-disable react/jsx-filename-extension, react/prop-types, jsx-quotes */

class Login extends Component {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }

  constructor(props) {
    super(props);

    this.state = {
      email: 'email@email.com',
      password: 'password',
      firstName: 'Bekah',
      lastName: 'Baker',
    };

    this.handleSignUpUser = this.handleSignUpUser.bind(this);
  }

  handleSignUpUser() {
    const credentials = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };
    this.props.newUser(credentials);

// console.log('USER', this.props.user.message)
    this.props.navigation.navigate('Dashboard');
  }

  render(){
    return(
      <View style={{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      }}>
        <TouchableOpacity
          onPress={ () => this.handleSignUpUser()}
          style={{
            width: 200,
            padding: 12,
            borderRadius:20,
            backgroundColor: 'orange',
            marginTop:20,
            alignItems: 'center',
          }}>
          <Text>{'LOGIN'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { newUser })(Login);
