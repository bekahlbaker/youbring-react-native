import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import { Content, View, Button, Text, Container } from 'native-base';
import { CheckBox } from 'react-native-elements';
import t from 'tcomb-form-native';
import Modal from 'react-native-modal';
import fonts from '../GLOBAL_STYLES/FONTS';
import colors from '../GLOBAL_STYLES/COLORS';
import { views, buttons, inputs, text, formStyles } from '../GLOBAL_STYLES/STYLES';

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
            <Text style={[buttons.buttonTextOnly, { padding: 10 }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

export default NewItemModal;
