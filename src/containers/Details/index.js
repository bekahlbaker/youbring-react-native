import React, { Component } from 'react';
import { TouchableOpacity, View, Text, FlatList, ListItem, Image, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import YBButton from '../../components/YBButton';
import YBInput from '../../components/YBInput';
import YBLabel from '../../components/YBLabel';
import styles from './styles';

/* eslint-disable react/jsx-filename-extension, react/prop-types, jsx-quotes */

class Details extends Component {

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: 'Details',
      headerTitleStyle: [{ alignSelf: 'center', color: colors.darkTextColor }, fonts.plainText],
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Icon name="keyboard-arrow-left" color={colors.darkTextColor} size={36} />
      </TouchableOpacity>
    ),
      headerRight: (
        <TouchableOpacity style={{ marginRight: 16 }} >
          <Text style={[{color: colors.darkTextColor}, fonts.plainText]}>Edit</Text>
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      details: this.props.navigation.state.params.item,
    };
  }

  render() {
    return (
      <View style={styles.mainView}>
        <YBLabel title='Event Title' text={this.state.details.title} />
        <YBLabel title='Event Details' text={this.state.details.details} />
      </View>
    );
  }
}

export default Details;
