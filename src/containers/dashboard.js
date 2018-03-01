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

const eventItemStyles = {
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: colors.lightGray,
  },
  title: [{
    color: colors.navy,
  }, fonts.semiBold15],
  description: [{
    color: colors.navy,
  }, fonts.regular15],
  date: [{
    color: colors.navy,
  }, fonts.regular15],
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  componentDidMount() {
  // Get Events when component mounts and set to state
  // Add Spinner for beginning when state is null
    AsyncStorage.getItem('Token')
      .then((token) => {
        this.props.getEvents(token);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.events) {
      this.setState({ events: nextProps.events });
    }
  }

  render() {
    console.log('USER INFO: ', this.props.user.user.events);
    if (this.props.user.user.events) {
      return (
        <Container style={views.container}>
          <Header hasSubtitle style={{ backgroundColor: colors.navy }}>
            <Left style={{ flex: 1 }} />
            <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Title style={text.headerText}>
                Home
              </Title>
            </Body>
            <Right style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEvent', { event: null, onGoBack: () => this.forceUpdate() })}>
                <Text style={buttons.rightBarButtonText}>New</Text>
              </TouchableOpacity>
            </Right>

          </Header>
          <StatusBar
            barStyle="light-content"
          />
          <FlatList
            data={this.state.events}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={eventItemStyles.container}
                onPress={() => this.props.navigation.navigate('Details', { item })}
              >
                <Text style={eventItemStyles.title}>{item.name}</Text>
                <Text style={eventItemStyles.description}>{item.description}</Text>
                <Text style={eventItemStyles.date}>{moment(item.date).format('MMM DD YYYY, h:mm a')}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id}
          />
        </Container>
      );
    }
    return (
      <Text>Loading</Text>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    events: state.events,
  };
};

export default connect(mapStateToProps, { getEvents })(Dashboard);
