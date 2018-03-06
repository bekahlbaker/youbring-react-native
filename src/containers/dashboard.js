import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StatusBar, AsyncStorage } from 'react-native';
import { View, Button, Text, Container, Header, Left, Right, Body, Title, Subtitle } from 'native-base';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import EventItem from './eventItem';
import { getEvents } from '../actions/event.actions';
import fonts from '../GLOBAL_STYLES/FONTS';
import colors from '../GLOBAL_STYLES/COLORS';
import { views, buttons, inputs, text, formStyles, lists } from '../GLOBAL_STYLES/STYLES';

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
    paddingTop: 8,
    paddingLeft: 16,
    paddingBottom: 8,
  }, fonts.regular19],
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };

    this.handleEditEvent = this.handleEditEvent.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
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

  handleEditEvent(event) {
    this.props.navigation.navigate('AddEditEvent', { event });
  }

  handleDetails(event) {
    this.props.navigation.navigate('Details', { event });
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
                Events
              </Title>
            </Body>
            <Right style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEditEvent', { event: null, onGoBack: () => this.forceUpdate() })}>
                <Text style={buttons.rightBarButtonText}>New</Text>
              </TouchableOpacity>
            </Right>

          </Header>
          <StatusBar
            barStyle="light-content"
          />
          <FlatList
            style={lists.flatList}
            data={this.state.events}
            renderItem={({ item }) => (
              <EventItem
                event={item}
                handleEdit={this.handleEditEvent}
                handleDetails={this.handleDetails}
              />
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
