import React, { Component } from 'react';
import { TouchableOpacity, View, Text, FlatList, ListItem, Image, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import YBButton from '../../components/YBButton';
import YBInput from '../../components/YBInput';
import YBLabel from '../../components/YBLabel';
import styles from './styles';

/* eslint-disable react/jsx-filename-extension, react/prop-types, jsx-quotes */

class Settings extends Component {

  constructor() {
    super();

    this.state = {
      isEditing: false,
      name: 'Jane Somebody',
      email: 'jane@email.com',
    }
  }

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: 'Settings',
      headerTitleStyle: [{ alignSelf: 'center', color: colors.darkTextColor }, fonts.plainText],
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Icon name="keyboard-arrow-left" color={colors.darkTextColor} size={36} />
      </TouchableOpacity>
    ),
      headerRight: (
        <TouchableOpacity style={{ marginRight: 16 }} onPress={() => params.handleEditSettings()} >
          <Text style={[{color: colors.darkTextColor}, fonts.plainText]}>Edit</Text>
        </TouchableOpacity>
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleEditSettings: this.handleEditSettings,
    });
  }


  handleLogOut = () => {
    Alert.alert(
      'Are you sure you want to log out?',
      '',
      [
        { text: 'Log Out', style: 'destructive', onPress: () => this.props.navigation.navigate('Login') },
        { text: 'Cancel', style: 'cancel' }
      ],
    );
  }

  handleEditSettings = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  renderSettingsForm() {
    if (this.state.isEditing) {
      return(
        <View>
          <View>
          <YBLabel title='Name' borderBottomWidth={0} />
            <YBInput placeholder='Name'></YBInput>
          </View>
          <View>
          <YBLabel title='Email' borderBottomWidth={0} />
            <YBInput placeholder='Email'></YBInput>
          </View>
        </View>
      );
    } else {
      return(
        <View>
          <View>
          <YBLabel title='Name' text={this.state.name} />
          </View>
          <View>
          <YBLabel title='Email' text={this.state.email} />
          </View>
        </View>
      );
    }
  }

  render() {
    return(
      <View style={styles.mainView}>
        {this.renderSettingsForm()}
        <View>
          <YBButton title='Log Out' onPress={() => this.handleLogOut()}></YBButton>
        </View>
      </View>
    );
  }
}

export default Settings;
