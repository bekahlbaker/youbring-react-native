import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { Content, View, Button, Text, Container } from 'native-base';
import fonts from '../FONTS';
import colors from '../COLORS';
import styles from '../GLOBAL_STYLES';

/* eslint-disable react/prop-types, react/jsx-filename-extension */

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

class EventDetails extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const event = this.props.navigation.state.params.item;
    console.log('Event passed ', event);
    return (
      <Container style={styles.container} >
        <Content
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >

          <View style={eventDetailsStyles.editButtonView}>
            <Button style={eventDetailsStyles.editButton} onPress={() => this.props.navigation.navigate('AddEvent', { event })}><Text style={eventDetailsStyles.editButtonText}>Edit</Text></Button>
          </View>

          <Text style={eventDetailsStyles.title}>
            {event.name}
          </Text>

          <Text style={eventDetailsStyles.description}>
            {event.description}
          </Text>

        </Content>
      </Container>
    );
  }
}

export default EventDetails;
