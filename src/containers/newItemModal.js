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
        style={{ backgroundColor: 'transparent' }}
      >
        <View style={{ backgroundColor: colors.white, borderRadius: 10, height: 200 }}>
          <TouchableOpacity onPress={() => this.props.handleClose()}>
            <Text style={{ padding: 8 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

export default NewItemModal;
