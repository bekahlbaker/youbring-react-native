import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import { Content, View, Button, Text, Container } from 'native-base';
import { CheckBox } from 'react-native-elements';
import t from 'tcomb-form-native';
import Modal from 'react-native-modal';
import fonts from '../FONTS';
import colors from '../COLORS';
import styles from '../GLOBAL_STYLES';

/* eslint-disable react/prop-types, react/jsx-filename-extension */

class NewItemModal extends Component {
  componentWillMount() {
    console.log('Modal will mount');
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isNewItemModalVisible}
        style={{ backgroundColor: colors.white }}
      >
        <Text>Create New item</Text>
        <TouchableOpacity onPress={() => this.props.handleClose()}>
          <Text>Close</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default NewItemModal;
