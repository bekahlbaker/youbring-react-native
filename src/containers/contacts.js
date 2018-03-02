import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StatusBar, AsyncStorage, Animated, Easing } from 'react-native';
import { View, Button, Text, Container, Header, Left, Right, Body, Title, Subtitle } from 'native-base';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { getContacts } from '../actions/contact.actions';
import fonts from '../GLOBAL_STYLES/FONTS';
import colors from '../GLOBAL_STYLES/COLORS';
import { views, buttons, inputs, text, formStyles, lists } from '../GLOBAL_STYLES/STYLES';

/* eslint-disable react/jsx-filename-extension, react/prop-types, jsx-quotes */

const contactsStyles = {
  contactName: [{
    color: colors.darkGray,
    paddingTop: 8,
    paddingLeft: 16,
    paddingBottom: 8,
  }, fonts.regular19],
};

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      listItemIsOpen: false,
    };

    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
  // Get Contacts when component mounts and set to state
  // Add Spinner for beginning when state is null
    AsyncStorage.getItem('Token')
      .then((token) => {
        this.props.getContacts(token);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contacts) {
      this.setState({ contacts: nextProps.contacts });
    }
  }

  spin() {
    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      },
    ).start();
  }

  renderOpenListItem(props) {
    if (this.state.listItemIsOpen) {
      return (
        <View>
          <Text>{props.lastName}</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg'],
    });
    return (
      <Container style={views.container}>
        <Header hasSubtitle style={{ backgroundColor: colors.navy }}>
          <Left style={{ flex: 1 }} />
          <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title style={text.headerText}>
              Contacts
            </Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEditContact', { onGoBack: () => this.forceUpdate() })}>
              <Text style={buttons.rightBarButtonText}>New</Text>
            </TouchableOpacity>
          </Right>
        </Header>
        <StatusBar
          barStyle="light-content"
        />
        <FlatList
          style={lists.flatList}
          data={this.state.contacts}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity style={views.listRowView} onPress={() => this.spin()}>
                <Text style={contactsStyles.contactName}>{item.firstName}</Text>
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <Ionicons
                    style={views.arrow}
                    name='ios-arrow-forward'
                    size={30}
                    color={colors.lightGray}
                  />
                </Animated.View>
              </TouchableOpacity>
              {this.renderOpenListItem()}
              <View style={views.separator} />
            </View>
          )}
          keyExtractor={item => item._id}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};

export default connect(mapStateToProps, { getContacts })(Contacts);
