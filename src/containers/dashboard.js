import React, { Component } from 'react';
import { TouchableOpacity, FlatList, ListItem, Image } from 'react-native';
import { Content, View, Button, Text, Container } from 'native-base';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { newUser } from '../actions/auth.actions';
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

  render() {
    if (this.props.user) {
      console.log('USER INFO: ', this.props.user.user);
      console.log(this.props.user.user.events);
      return (
        <Container style={styles.container}>
          <Text style={dashboardStyles.welcome}>Hello {this.props.user.user.firstName}</Text>

          <View style={dashboardStyles.addNewButtonView}>
            <Button style={dashboardStyles.addNewButton} onPress={() => this.handleOnPressEditButton}><Text style={dashboardStyles.addNewButtonText}>Edit</Text></Button>
          </View>

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
