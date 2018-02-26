import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { View, Button, Text, Container, Header, Left, Right, Body, Title, Subtitle } from 'native-base';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import fonts from '../FONTS';
import colors from '../COLORS';
import styles from '../GLOBAL_STYLES';

/* eslint-disable react/jsx-filename-extension, react/prop-types, jsx-quotes */

const dashboardStyles = {
  welcome: [{
    marginTop: 30,
    textAlign: 'center',
  }, fonts.extraBold36],
  addNewButtonView: {
    alignSelf: 'flex-end',
  },
  addNewButton: {
    width: 100,
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  addNewButtonText: [{
    color: colors.orange,
    textAlign: 'right',
  }, fonts.regular15],
};

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
      events: this.props.user.user.events,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.setParams({ onGoBack: () => this.forceUpdate() });
      console.log('Params did mount', this.props.navigation.state.params);
    }, 2000);
  }

  render() {
    console.log('USER INFO: ', this.props.user.user.events);
    if (this.props.user.user.events) {
      return (
        <Container style={styles.container}>
          <Header hasSubtitle style={{ backgroundColor: colors.navy }}>
            <Left style={{ flex: 1 }} />
            <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Title style={styles.headerText}>
                Home
              </Title>
            </Body>
            <Right style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEvent')}>
                <Text style={styles.rightBarButtonText}>Add</Text>
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
  };
};

export default connect(mapStateToProps)(Dashboard);
