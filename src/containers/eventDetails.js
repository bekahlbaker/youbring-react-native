import React, { Component } from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { Content, View, Button, Text, Container, Header, Left, Right, Body, Title, Icon } from 'native-base';
import moment from 'moment';
import fonts from '../GLOBAL_STYLES/FONTS';
import colors from '../GLOBAL_STYLES/COLORS';
import { views, buttons, inputs, text, formStyles } from '../GLOBAL_STYLES/STYLES';

/* eslint-disable react/prop-types, react/jsx-filename-extension */

let event = {};

const eventDetailsStyles = {
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

export const EventDetails = ({ navigation }) => {
  event = navigation.state.params.item;
  return (
    <Container style={views.container} >
      <Header hasSubtitle style={{ backgroundColor: colors.navy }}>
        <Left style={{ flex: 1 }}>

          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={{ color: colors.white }} name="arrow-back" />
          </Button>

        </Left>
        <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Title style={text.headerText}>
            Event
          </Title>
        </Body>
        <Right style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.navigate('AddEvent', { event })}>
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
        <Text style={eventDetailsStyles.title}>
          {event.name}
        </Text>

        <Text style={eventDetailsStyles.description}>{moment(event.date).format('MMM DD YYYY, h:mm a')}</Text>

        <Text style={eventDetailsStyles.description}>
          {event.description}
        </Text>

      </Content>
    </Container>
  );
};

EventDetails.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate('AddEvent', { event })}>
      <Text style={buttons.rightBarButtonText}>Edit</Text>
    </TouchableOpacity>
  ),
});

export default EventDetails;
