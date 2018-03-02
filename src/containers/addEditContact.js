import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, Alert, StatusBar, Animated, Easing } from 'react-native';
import { Content, View, Button, Text, Container, Header, Left, Right, Body, Title, Icon } from 'native-base';
import { CheckBox } from 'react-native-elements';
import t from 'tcomb-form-native';
import * as Keychain from 'react-native-keychain';
import { connect } from 'react-redux';
import moment from 'moment';
import { newContact } from '../actions/contact.actions';
import NewItemModal from './newItemModal';
import fonts from '../GLOBAL_STYLES/FONTS';
import colors from '../GLOBAL_STYLES/COLORS';
import { views, buttons, inputs, text, formStyles } from '../GLOBAL_STYLES/STYLES';

/* eslint-disable react/prop-types, react/jsx-filename-extension */

class AddEditContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {},
      isNew: true,
      checked: false,
      eventId: 0,
    };

    this.Contact = t.struct({
      firstName: t.String,
      lastName: t.String,
      phone: t.maybe(t.Number),
      email: t.maybe(t.String),
    });

    this.handleSaveContact = this.handleSaveContact.bind(this);
    // this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    // this.checkIfEventIsNew = this.checkIfEventIsNew.bind(this);
  }

  // componentDidMount() {
  //   this.checkIfEventIsNew();
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contacts) {
      console.log('Contact was created', nextProps.contacts);
      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack();
    }
  }

  onChange(value) {
    this.setState({ value });
  }
  //
  // checkIfEventIsNew() {
  //   if (this.props.navigation.state.params.event != null) {
  //     const event = this.props.navigation.state.params.event;
  //     const value = {
  //       name: event.name,
  //       date: event.date ? new Date(event.date) : new Date(),
  //       description: event.description,
  //     };
  //     this.setState({ value, isNew: false, eventId: event._id });
  //   }
  // }

  handleSaveContact() {
    const value = this.form.getValue();
    if (value) {
      console.log('value: ', value);
      AsyncStorage.getItem('Token')
        .then((token) => {
          console.log('SAVED TOKEN ', token);
          // if (this.state.isNew) {
          this.props.newContact(value, token);
          // } else {
          //  this.props.updateEvent(createdValue, token, this.state.eventId);
          // }
        });
    }
  }
  //
  // handleDeleteEvent() {
  //   Alert.alert(
  //     'Are you sure you want to delete this event?',
  //     '',
  //     [
  //       {
  //         text: 'Delete',
  //         onPress: () =>
  //           AsyncStorage.getItem('Token')
  //             .then((token) => {
  //               console.log('SAVED TOKEN ', token);
  //               this.props.deleteEvent(token, this.state.eventId);
  //             }),
  //         style: 'destructive',
  //       },
  //       { text: 'Cancel', style: 'cancel' },
  //     ],
  //   );
  // }
  //
  // handleCheckButton() {
  //   this.setState({ checked: !this.state.checked });
  // }
  //
  // handleNewItemModal() {
  //   this.setState({ isNewItemModalVisible: !this.state.isNewItemModalVisible });
  // }
  //
  // renderNewItemModal() {
  //   if (this.state.isNewItemModalVisible) {
  //     return (
  //       <NewItemModal
  //         isNewItemModalVisible={this.state.isNewItemModalVisible}
  //         handleClose={this.handleNewItemModal}
  //       />
  //     );
  //   }
  //   return null;
  // }
  //
  // renderDeleteButton() {
  //   if (!this.state.isNew) {
  //     return (
  //       <Button style={[buttons.redButton, { marginTop: 50 }]} onPress={() => this.handleDeleteEvent()}>
  //         <Text style={buttons.orangeButtonText}>Delete Event</Text>
  //       </Button>
  //     );
  //   }
  //   return null;
  // }

  render() {
    const formOptions = {
      fields: {
        firstName: {
          error: 'Please fill the contacts first name.',
        },
        lastName: {
          error: 'Please fill the contacts last name.',
        },
        phone: {
          error: 'Please fill the contacts first name.',
          label: 'Phone',
        },
        email: {
          error: 'Please fill the contacts first name.',
          label: 'Email',
        },
      },
      stylesheet: formStyles,
    };
    return (
      <Container style={views.container} >
        <Header hasSubtitle style={{ backgroundColor: colors.navy }}>
          <Left style={{ flex: 1 }}>

            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ color: colors.white }} name="arrow-back" />
            </Button>

          </Left>
          <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title style={text.headerText}>
              New Event
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <StatusBar
          barStyle="light-content"
        />
        <Content
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={views.scrollView}
        >
          <Text style={text.logoText}>{this.state.isNew ? 'Add a new contact' : 'Update contact'}</Text>
          <View>
            <t.form.Form
              ref={c => this.form = c}
              type={this.Contact}
              options={formOptions}
              value={this.state.value}
              onChange={value => this.onChange(value)}
            />
          </View>

          <Button
            style={[buttons.orangeButton, { marginTop: 50 }]}
            onPress={() => this.handleSaveContact()}
          >
            <Text style={buttons.orangeButtonText}>{this.state.isNew ? 'Save Contact' : 'Update Contact'}</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};

export default connect(mapStateToProps, { newContact })(AddEditContact);
