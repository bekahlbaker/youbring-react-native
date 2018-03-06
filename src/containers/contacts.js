import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StatusBar, AsyncStorage } from 'react-native';
import { View, Button, Text, Container, Header, Left, Right, Body, Title, Subtitle } from 'native-base';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';
import ContactItem from './contactItem';
import { getContacts } from '../actions/contact.actions';
import fonts from '../GLOBAL_STYLES/FONTS';
import colors from '../GLOBAL_STYLES/COLORS';
import { views, buttons, inputs, text, formStyles, lists } from '../GLOBAL_STYLES/STYLES';

/* eslint-disable react/jsx-filename-extension, react/prop-types, jsx-quotes */

const contactsStyles = {

};

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      listItemIsOpen: false,
    };

    this.handleEditContact = this.handleEditContact.bind(this);
  }

  componentDidMount() {
  // Get Contacts when component mounts and set to state
  // Add Spinner for beginning when state is null
    AsyncStorage.getItem('Token')
      .then((token) => {
        this.props.getContacts(token);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contacts) {
      this.setState({ contacts: nextProps.contacts });
    }
  }

  handleEditContact(contact) {
    this.props.navigation.navigate('AddEditContact', { contact });
  }

  renderOpenListItem(props) {
    if (this.state.listItemIsOpen) {
      return (
        <View>
          <Text>{props.lastName}</Text>
        </View>
      );
    }
    return null;
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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEditContact', { item: null, onGoBack: () => this.forceUpdate() })}>
              <Text style={buttons.rightBarButtonText}>New</Text>
            </TouchableOpacity>
          </Right>
        </Header>
        <StatusBar
          barStyle="light-content"
        />
        <FlatList
          style={lists.flatList}
          data={this.state.contacts}
          renderItem={({ item }) => (
            <ContactItem
              contact={item}
              handleEdit={this.handleEditContact}
            />
          )}
          keyExtractor={item => item._id}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};

export default connect(mapStateToProps, { getContacts })(Contacts);
