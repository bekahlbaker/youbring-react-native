import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StatusBar, AsyncStorage } from 'react-native';
import { View, Button, Text, Container, Header, Left, Right, Body, Title, Subtitle } from 'native-base';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { getEvents } from '../actions/event.actions';
import fonts from '../GLOBAL_STYLES/FONTS';
import colors from '../GLOBAL_STYLES/COLORS';
import { views, buttons, inputs, text, formStyles } from '../GLOBAL_STYLES/STYLES';

/* eslint-disable react/jsx-filename-extension, react/prop-types, jsx-quotes */

const contactsStyles = {

};

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts:
      [
            {
            "id": "49bf715d-9402-4b11-b2cc-fab3edf027ce",
            "name": "Elaina Schneider"
         },
            {
            "id": "6be0dac4-32b9-4569-a447-dd9f2e7f64f9",
            "name": "Louis Jennings"
         },
            {
            "id": "b22810d6-b95f-45b9-b812-fb2a70f47226",
            "name": "Saniya Grimes"
         },
            {
            "id": "2034aa57-7d00-48c7-82b2-379a3e4b8243",
            "name": "Daphne Morgan"
         },
            {
            "id": "05949d56-49e5-4691-bae8-cca477f412a8",
            "name": "Hattie Lambert"
         },
            {
            "id": "040c44ee-c3cf-441d-8377-f249eb243474",
            "name": "Omari Mckinney"
         },
            {
            "id": "db0bbe23-4fe5-4676-bfaa-6348746c2564",
            "name": "Kiersten Kidd"
         },
            {
            "id": "3107da12-e449-4217-a839-ae56ee7b1975",
            "name": "Sandra Finch"
         },
            {
            "id": "7e8e3be8-8558-46d3-80fc-83263515fecd",
            "name": "Rosemary Douglas"
         },
            {
            "id": "3684b70d-f127-4385-9b97-bf114917aa41",
            "name": "Mariano Suarez"
         }
      ],
    };
  }

  render() {
    return (
      <Container style={views.container}>
        <Header hasSubtitle style={{ backgroundColor: colors.navy }}>
          <Left style={{ flex: 1 }} />
          <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title style={text.headerText}>
              Contacts
            </Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <TouchableOpacity>
              <Text style={buttons.rightBarButtonText}>New</Text>
            </TouchableOpacity>
          </Right>
        </Header>
        <StatusBar
          barStyle="light-content"
        />
        <FlatList
          data={this.state.contacts}
          renderItem={({ contact }) => (
            <TouchableOpacity>
              <Text>Contact Name Here</Text>
            </TouchableOpacity>
          )}
          keyExtractor={contact => contact.id}
        />
      </Container>
    );
  }
}

export default Contacts;
