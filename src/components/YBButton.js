import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../global/colors';
import fonts from '../global/fonts';

/* eslint-disable react/jsx-filename-extension, no-console */

const styles = {
  YBButtonStyle: {
    width: 300,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
};

const YBButton = ({ title, onPress, color }) => (
  <TouchableOpacity
    onPress={onPress}
  >
    <View style={[{ backgroundColor: color }, styles.YBButtonStyle]}>
      <Text style={[{ textAlign: 'center' }, fonts.buttonFont]}>{title}</Text>
    </View>
  </TouchableOpacity>
);

YBButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.string,
};

YBButton.defaultProps = {
  title: 'Default',
  onPress: console.log('Button Pressed'),
  color: colors.mainColor,
};

export default YBButton;
