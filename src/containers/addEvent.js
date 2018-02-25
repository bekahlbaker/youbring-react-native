import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import { Content, View, Button, Text, Container } from 'native-base';
import { CheckBox } from 'react-native-elements';
import t from 'tcomb-form-native';
import * as Keychain from 'react-native-keychain';
import { connect } from 'react-redux';
import moment from 'moment';
import { newEvent, updateEvent } from '../actions/event.actions';
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
    this.handleCheckButton = this.handleCheckButton.bind(this);
    this.handleNewItemModal = this.handleNewItemModal.bind(this);
  }

  componentWillMount() {
    if (this.props.navigation.state.params) {
      console.log('Params ', this.props.navigation.state.params);
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
    if (nextProps.createdEvent) {
      console.log('Event was created ', nextProps.createdEvent);
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
            <Text style={styles.orangeButtonText}>Save Event</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.createdEvent,
  };
};

export default connect(mapStateToProps, { newEvent, updateEvent })(AddEvent);
