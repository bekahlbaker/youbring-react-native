import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { View, Button, Text, Container } from 'native-base';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
      // events: this.props.user.user.events,
      events: [
        {
          "id": "031397bf-05c5-448c-98c5-cb7d7c70c69a",
          "name": "Risus eros mi?",
          "date": "2018-02-23T14:00:27-06:00"
       },
          {
          "id": "7af61889-281a-4eae-9d95-ff134fb3a684",
          "name": "Tellus ornare pharetra.",
          "date": "1976-07-10T08:39:20"
       },
          {
          "id": "9ebadfbc-1afd-4c0f-93e3-24f3bb8c796d",
          "name": "Potenti adipiscing adipiscing.",
          "date": "1941-03-19T02:13:48"
       },
          {
          "id": "48b1d859-7b67-4364-b3f0-ccc4ebd03d7b",
          "name": "Curae; ligula, laoreet.",
          "date": "1909-11-30T02:49:09"
       },
      ],
    };
  }

  render() {
    console.log('USER INFO: ', this.props.user.user.events);
    if (this.props.user.user.events) {
      return (
        <Container style={styles.container}>
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
                <Text style={eventItemStyles.date}>{item.date}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </Container>
      );
    }
    return (
      <Text>Loading</Text>
    );
  }
}

Dashboard.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <TouchableOpacity onPress={() => navigation.navigate('AddEvent')}>
      <Text style={styles.rightBarButtonText}>Add</Text>
    </TouchableOpacity>
  ),
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Dashboard);
