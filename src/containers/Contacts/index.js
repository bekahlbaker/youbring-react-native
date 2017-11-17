import React, { Component } from 'react';
import { TouchableOpacity, View, Text, FlatList, ListItem, Image, Alert, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import YBButton from '../../components/YBButton';
import YBInput from '../../components/YBInput';
import YBLabel from '../../components/YBLabel';
import styles from './styles';

/* eslint-disable react/jsx-filename-extension, react/prop-types, jsx-quotes */

class Contacts extends Component {

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: 'Create',
      headerTitleStyle: [{ alignSelf: 'center', color: colors.darkTextColor }, fonts.plainText],
      headerLeft: (
        <View />
    ),
      headerRight: (
        <View />
      ),
    };
  };

  render() {
    return(
      <View style={styles.mainView}>
        <Text>Contacts</Text>
      </View>
    );
  }
}

export default Contacts;
