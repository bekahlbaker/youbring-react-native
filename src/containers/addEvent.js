import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { Content, View, Button, Text, Container, Header, Left, Right, Body, Title, Icon } from 'native-base';
import { CheckBox } from 'react-native-elements';
import t from 'tcomb-form-native';
import * as Keychain from 'react-native-keychain';
import { connect } from 'react-redux';
import moment from 'moment';
import { newEvent, updateEvent, deleteEvent } from '../actions/event.actions';
import NewItemModal from './newItemModal';
import fonts from '../FONTS';
import colors from '../COLORS';
import styles from '../GLOBAL_STYLES';

/* eslint-disable react/prop-types, react/jsx-filename-extension */

class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {},
      isNew: true,
      checked: false,
      isNewItemModalVisible: false,
      eventId: 0,
    };

    this.myFormatFunction = (format, date) => moment(date).format(format);

    this.Event = t.struct({
      name: t.String,
      date: t.Date,
      description: t.String,
    });

    this.handleSaveEvent = this.handleSaveEvent.bind(this);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.handleCheckButton = this.handleCheckButton.bind(this);
    this.handleNewItemModal = this.handleNewItemModal.bind(this);
  }

  componentDidMount() {
    if (this.props.navigation.state.params.event) {
    setTimeout(() => {
      console.log('Params ', this.props.navigation.state.params);
    }, 2000);
      const event = this.props.navigation.state.params.event;
      const value = {
        name: event.name,
        date: new Date(event.date),
        description: event.description,
      };
      this.setState({ value, isNew: false, eventId: event._id });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.events) {
      console.log('Event was created', nextProps.events);
      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack();
    }
  }

  onChange(value) {
    this.setState({ value });
  }

  handleSaveEvent() {
    const value = this.form.getValue();
    if (value) {
      const date = moment(value.date).format();
      console.log('date', date);
      console.log('value: ', value);
      const createdValue = {
        name: value.name,
        date,
        description: value.description,
      };
      AsyncStorage.getItem('Token')
        .then((token) => {
          console.log('SAVED TOKEN ', token);
          if (this.state.isNew) {
            this.props.newEvent(createdValue, token);
          } else {
            this.props.updateEvent(createdValue, token, this.state.eventId);
          }
        });
    }
  }

  handleDeleteEvent() {
    Alert.alert(
      'Are you sure you want to delete this event?',
      '',
      [
        {
          text: 'Delete',
          onPress: () =>
            AsyncStorage.getItem('Token')
              .then((token) => {
                console.log('SAVED TOKEN ', token);
                this.props.deleteEvent(token, this.state.eventId);
              }),
          style: 'destructive',
        },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  }

  handleCheckButton() {
    this.setState({ checked: !this.state.checked });
  }

  handleNewItemModal() {
    this.setState({ isNewItemModalVisible: !this.state.isNewItemModalVisible });
  }

  renderNewItemModal() {
    if (this.state.isNewItemModalVisible) {
      return (
        <NewItemModal
          isNewItemModalVisible={this.state.isNewItemModalVisible}
          handleClose={this.handleNewItemModal}
        />
      );
    }
    return null;
  }

  renderDeleteButton() {
    if (!this.state.isNew) {
      return (
        <Button style={[styles.redButton, { marginTop: 50 }]} onPress={() => this.handleDeleteEvent()}>
          <Text style={styles.orangeButtonText}>Delete Event</Text>
        </Button>
      );
    }
    return null;
  }

  render() {
    const formOptions = {
      fields: {
        name: {
          error: 'Please fill in the event name.',
        },
        date: {
          error: 'Please choose a date for the event.',
          config: {
            format: date => this.myFormatFunction('MMM DD YYYY, h:mm a', date),
          },
        },
      },
      stylesheet: styles.formStyles,
    };
    return (
      <Container style={styles.container} >
        {this.renderNewItemModal()}
        <Header hasSubtitle style={{ backgroundColor: colors.navy }}>
          <Left style={{ flex: 1 }}>

            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ color: colors.white }} name="arrow-back" />
            </Button>

          </Left>
          <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title style={styles.headerText}>
              New Event
            </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          <Text style={styles.logoText}>{this.state.isNew ? 'Add a new event' : 'Update event'}</Text>
          <View style={styles.view}>
            <t.form.Form
              ref={c => this.form = c}
              type={this.Event}
              options={formOptions}
              value={this.state.value}
              onChange={value => this.onChange(value)}
            />
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <CheckBox
              title="User can create own items for event."
              checked={this.state.checked}
              containerStyle={styles.checkBox}
              textStyle={styles.gray13Text}
              onPress={() => this.handleCheckButton()}
              size={24}
              checkedColor={colors.orange}
            />
          </View>

          <TouchableOpacity style={{ marginTop: 30, width: 300, height: 45 }} onPress={() => this.handleNewItemModal()}>
            <Text style={styles.buttonTextOnly}>Add Item</Text>
          </TouchableOpacity>

          <Button style={[styles.orangeButton, { marginTop: 50 }]} onPress={() => this.handleSaveEvent()}>
            <Text style={styles.orangeButtonText}>{this.state.isNew ? 'Save Event' : 'Update Event'}</Text>
          </Button>

          {this.renderDeleteButton()}

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
  };
};

export default connect(mapStateToProps, { newEvent, updateEvent, deleteEvent })(AddEvent);
