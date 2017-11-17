import React, { Component } from 'react';
import { TouchableOpacity, View, Text, FlatList, ListItem, Image, Alert, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import YBButton from '../../components/YBButton';
import YBInput from '../../components/YBInput';
import YBLabel from '../../components/YBLabel';
import styles from './styles';

/* eslint-disable react/jsx-filename-extension, react/prop-types, jsx-quotes */

class Create extends Component {

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: 'Create',
      headerTitleStyle: [{ alignSelf: 'center', color: colors.darkTextColor }, fonts.plainText],
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Icon name="keyboard-arrow-left" color={colors.darkTextColor} size={36} />
      </TouchableOpacity>
    ),
      headerRight: (
        <View />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      details: {},
    };
  }

  render() {
    return (
      <ScrollView style={styles.mainView} contentContainerStyle={styles.center}>
        <View>
        <YBLabel title='Event Title' borderBottomWidth={0} />
          <YBInput placeholder='Title'></YBInput>
        </View>
        <View>
        <YBLabel title='Event Date' borderBottomWidth={0} />
          <YBInput placeholder='Date'></YBInput>
        </View>
        <View>
        <YBLabel title='Event Time' borderBottomWidth={0} />
          <YBInput placeholder='Time'></YBInput>
        </View>
        <View>
        <YBLabel title='Event Place' borderBottomWidth={0} />
          <YBInput placeholder='Place'></YBInput>
        </View>
        <View>
        <YBLabel title='Add Contacts' borderBottomWidth={0} />
          <YBInput placeholder='Contacts'></YBInput>
        </View>
        <View>
          <YBButton title='Save'></YBButton>
        </View>
        <KeyboardSpacer />
      </ScrollView>
    );
  }
}

export default Create;
