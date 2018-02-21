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
            "id": 1,
            "name": "Quisque class consequat.",
            "description": "Lorem ipsum netus diam dictum mollis tellus dolor purus semper mattis fames.Consequat, et sodales ultrices consequat natoque justo egestas faucibus eros cum.",
            "date": "1960-07-21"
         },
            {
            "id": 2,
            "name": "Hac metus diam!",
            "description": "Lorem ipsum curabitur nec potenti aliquet suscipit dictumst id libero himenaeos varius aliquet dolor?Gravida ullamcorper habitasse dictumst ut ipsum bibendum imperdiet sit integer venenatis ante.",
            "date": "1933-12-12"
         },
            {
            "id": 3,
            "name": "Facilisi potenti odio.",
            "description": "Lorem ipsum velit nam et lobortis quam amet libero risus natoque.Metus et mattis, scelerisque pellentesque ipsum cum iaculis hendrerit vel.",
            "date": "1930-05-14"
         },
            {
            "id": 4,
            "name": "Ultrices, hendrerit inceptos!",
            "description": "Lorem ipsum penatibus feugiat vivamus inceptos hac urna senectus cum viverra placerat mus quis.Sodales mus habitasse odio, proin aliquet non fermentum volutpat.",
            "date": "1913-01-08"
         },
            {
            "id": 5,
            "name": "Ac fames suscipit.",
            "description": "Lorem ipsum egestas sagittis torquent ante taciti natoque tellus nec elit dui!Neque dictum bibendum cursus sociosqu eros convallis tempus lorem vitae dapibus.",
            "date": "2010-08-20"
         },
            {
            "id": 6,
            "name": "Urna, luctus gravida.",
            "description": "Lorem ipsum mus quis mauris neque, in suspendisse ante conubia!Facilisi pharetra nascetur vivamus class egestas aliquam laoreet libero.",
            "date": "1903-04-15"
         },
            {
            "id": 7,
            "name": "Commodo aptent arcu.",
            "description": "Lorem ipsum sociosqu dictum ad tristique cursus class ornare porttitor ullamcorper conubia!Sagittis gravida blandit porta praesent orci egestas ipsum a.",
            "date": "1962-08-08"
         },
            {
            "id": 8,
            "name": "Tincidunt gravida est.",
            "description": "Lorem ipsum augue elementum auctor vulputate porta mattis posuere sodales fames.Habitasse massa; dui nibh tortor suscipit urna mollis diam ultricies ipsum.",
            "date": "1988-08-24"
         },
            {
            "id": 9,
            "name": "Senectus cum donec?",
            "description": "Lorem ipsum turpis feugiat dis praesent penatibus conubia litora lacinia.Pharetra praesent pellentesque malesuada donec curae; porta libero non.",
            "date": "1942-11-21"
         },
            {
            "id": 10,
            "name": "Congue ante auctor.",
            "description": "Lorem ipsum placerat lorem facilisis lacinia eget fusce euismod habitant.Neque quisque volutpat lobortis mi natoque nisi tincidunt accumsan lacus!",
            "date": "1953-09-07"
         }
      ]
    };
  }

  render() {
    if (this.props.user) {
      console.log('USER INFO: ', this.props.user.user);
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

Dashboard.navigationOptions = ({ navigation })=> ({
  headerRight: (
    <TouchableOpacity>
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
