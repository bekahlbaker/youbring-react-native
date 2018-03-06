import React, { Component } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { View, Button, Text, Container, Header, Left, Right, Body, Title, Subtitle } from 'native-base';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import { getContacts } from '../actions/contact.actions';
import fonts from '../GLOBAL_STYLES/FONTS';
import colors from '../GLOBAL_STYLES/COLORS';
import { views, buttons, inputs, text, formStyles, lists } from '../GLOBAL_STYLES/STYLES';

/* eslint-disable react/jsx-filename-extension, react/prop-types, jsx-quotes */

const contactItemStyles = {
  contactName: [{
    color: colors.navy,
    paddingTop: 8,
    paddingLeft: 16,
    paddingBottom: 8,
  }, fonts.regular19],
  contactInfo: [{
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
};

class ContactItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldBeCollapsed: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('props', nextProps);
  }

  handleEditContact(contact) {
    this.props.navigation.navigate('AddEditContact', { contact });
  }

  handleDeleteContact(id) {
    Alert.alert(
      'Are you sure you want to delete this event?',
      '',
      [
        {
          text: 'Delete',
          onPress: () => console.log('Delete contact with id of: ', id),
          style: 'destructive',
        },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  }

  render() {
    const contact = this.props.contact;
    return (
      <View>
        <TouchableOpacity
          style={views.listRowView}
          onPress={() => this.setState({ shouldBeCollapsed: !this.state.shouldBeCollapsed })}
        >
          <Text style={contactItemStyles.contactName}>{`${contact.firstName} ${contact.lastName}`}</Text>
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
            <View style={[views.rowView, contactItemStyles.row]}>
              <Ionicons
                name='ios-phone-portrait'
                size={22}
                color={colors.mediumGray}
              />
              <Text style={contactItemStyles.contactInfo}>{contact.phone || '555-5555'}</Text>
            </View>
            <View style={[views.rowView, contactItemStyles.row]}>
              <Ionicons
                name='ios-mail'
                size={22}
                color={colors.mediumGray}
              />
              <Text style={contactItemStyles.contactInfo}>{contact.email || 'email@email.com'}</Text>
            </View>
          </View>

          <View style={[views.rowView, { justifyContent: 'space-around' }]}>
            <TouchableOpacity
              style={[views.rowView, contactItemStyles.editRow]}
              onPress={() => this.props.handleEdit(contact)}
            >
              <Ionicons
                name='ios-cog'
                size={28}
                color={colors.lightBlue}
              />
              <Text style={contactItemStyles.edit}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[views.rowView, contactItemStyles.editRow]}
              onPress={() => this.handleDeleteContact(contact._id)}
            >
              <Ionicons
                name='ios-trash'
                size={28}
                color={colors.error}
              />
              <Text style={contactItemStyles.trash}>Trash</Text>
            </TouchableOpacity>
          </View>
        </Collapsible>
        <View style={views.separator} />
      </View>
    );
  }
}

export default ContactItem;
