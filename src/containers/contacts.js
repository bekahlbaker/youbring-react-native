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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEvent', { event: null, onGoBack: () => this.forceUpdate() })}>
              <Text style={buttons.rightBarButtonText}>Add</Text>
            </TouchableOpacity>
          </Right>

        </Header>
        <StatusBar
          barStyle="light-content"
        />
      </Container>
    );
  }
}

export default Contacts;
