import React, { Component } from 'react';
import { TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { View, Button, Text, Container, Header, Left, Right, Body, Title, Subtitle } from 'native-base';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';
import { deleteEvent } from '../actions/event.actions';
import fonts from '../GLOBAL_STYLES/FONTS';
import colors from '../GLOBAL_STYLES/COLORS';
import { views, buttons, inputs, text, formStyles, lists } from '../GLOBAL_STYLES/STYLES';

/* eslint-disable react/jsx-filename-extension, react/prop-types, jsx-quotes */

const eventItemStyles = {
  eventName: [{
    color: colors.navy,
    paddingTop: 8,
    paddingLeft: 16,
    paddingBottom: 8,
  }, fonts.regular22],
  eventInfo: [{
    color: colors.darkGray,
    paddingTop: 4,
    paddingLeft: 8,
    paddingBottom: 8,
  }, fonts.regular19],
  row: {
    marginLeft: 16,
    marginRight: 16,
  },
  editRow: {
    paddingTop: 8,
  },
  edit: [{
    color: colors.lightBlue,
    paddingTop: 4,
    paddingLeft: 8,
    paddingBottom: 8,
  }, fonts.regular13],
  trash: [{
    color: colors.error,
    paddingTop: 4,
    paddingLeft: 8,
    paddingBottom: 8,
  }, fonts.regular13],
  seeDetails: [{
    color: colors.orange,
    paddingTop: 8,
    paddingLeft: 16,
    paddingBottom: 16,
    textDecorationLine: 'underline',
  }, fonts.regular13],
};

class EventItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldBeCollapsed: true,
    };
  }

  handleDeleteContact(id) {
    Alert.alert(
      'Are you sure you want to delete this event?',
      '',
      [
        {
          text: 'Delete',
          onPress: () =>
            AsyncStorage.getItem('Token')
              .then((token) => {
                this.props.deleteEvent(token, id);
              }),
          style: 'destructive',
        },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  }

  render() {
    const event = this.props.event;
    return (
      <View>
        <TouchableOpacity
          style={views.listRowView}
          onPress={() => this.setState({ shouldBeCollapsed: !this.state.shouldBeCollapsed })}
        >
          <Text style={eventItemStyles.eventName}>{event.name}</Text>
          <View>
            <Ionicons
              style={views.arrow}
              name={this.state.shouldBeCollapsed ? 'ios-arrow-forward' : 'ios-arrow-down'}
              size={30}
              color={colors.lightGray}
            />
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={this.state.shouldBeCollapsed}>
          <View style={[views.rowView, { justifyContent: 'space-between' }]}>
            <View style={[views.rowView, eventItemStyles.row]}>
              <Ionicons
                name='ios-calendar'
                size={22}
                color={colors.mediumGray}
              />
              <Text style={eventItemStyles.eventInfo}>{moment(event.date).format('MMM DD YYYY, h:mm a')}</Text>
            </View>
          </View>

          <Text style={[eventItemStyles.eventInfo, { paddingLeft: 16 }]}>{event.description}</Text>
          <TouchableOpacity onPress={() => this.props.handleDetails(event)}>
            <Text style={eventItemStyles.seeDetails}>See Details</Text>
          </TouchableOpacity>

          <View style={[views.rowView, { justifyContent: 'space-around' }]}>
            <TouchableOpacity
              style={[views.rowView, eventItemStyles.editRow]}
              onPress={() => this.props.handleEdit(event)}
            >
              <Ionicons
                name='ios-cog'
                size={28}
                color={colors.lightBlue}
              />
              <Text style={eventItemStyles.edit}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[views.rowView, eventItemStyles.editRow]}
              onPress={() => this.handleDeleteContact(event._id)}
            >
              <Ionicons
                name='ios-trash'
                size={28}
                color={colors.error}
              />
              <Text style={eventItemStyles.trash}>Trash</Text>
            </TouchableOpacity>
          </View>
        </Collapsible>
        <View style={views.separator} />
      </View>
    );
  }
}

export default EventItem;
