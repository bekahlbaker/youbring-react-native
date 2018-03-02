import React, { Component } from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { Content, View, Button, Text, Container, Header, Left, Right, Body, Title, Icon } from 'native-base';
import moment from 'moment';
import fonts from '../GLOBAL_STYLES/FONTS';
import colors from '../GLOBAL_STYLES/COLORS';
import { views, buttons, inputs, text, formStyles } from '../GLOBAL_STYLES/STYLES';

/* eslint-disable react/prop-types, react/jsx-filename-extension */

const profileStyles = {
  editButtonView: {
    alignSelf: 'flex-end',
  },
  editButton: {
    width: 100,
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  editButtonText: [{
    color: colors.orange,
    textAlign: 'right',
  }, fonts.regular15],
  title: [{
    color: colors.navy,
    padding: 10,
  }, fonts.semiBold24],
  description: [{
    color: colors.navy,
  }, fonts.regular15],
};

const Profile = ({ navigation }) => {
  return (
    <Container style={views.container} >
      <Header hasSubtitle style={{ backgroundColor: colors.navy }}>
        <Left style={{ flex: 1 }}>

        </Left>
        <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Title style={text.headerText}>
            Profile
          </Title>
        </Body>
        <Right style={{ flex: 1 }}>
          <TouchableOpacity>
            <Text style={buttons.rightBarButtonText}>Edit</Text>
          </TouchableOpacity>
        </Right>
      </Header>
      <StatusBar
        barStyle="light-content"
      />
      <Content
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={views.scrollView}
      >
        <Text>About Me</Text>
      </Content>
    </Container>
  );
};

export default Profile;
