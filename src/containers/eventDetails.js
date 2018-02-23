import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Content, View, Button, Text, Container } from 'native-base';
import moment from 'moment';
import fonts from '../FONTS';
import colors from '../COLORS';
import styles from '../GLOBAL_STYLES';

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
  console.log('Event passed ', event);
  return (
    <Container style={styles.container} >
      <Content
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
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
      <Text style={styles.rightBarButtonText}>Edit</Text>
    </TouchableOpacity>
  ),
});

export default EventDetails;
