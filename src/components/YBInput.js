import React from 'react';
import { TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../global/colors';
import fonts from '../global/fonts';

/* eslint-disable react/jsx-filename-extension, no-console, jsx-quotes */

const styles = {
  YBInputStyle: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: colors.inputBackgroundColor,
  },
  text: [{
    paddingLeft: 20,
  },
  fonts.placeholderFont],
};

const YBInput = ({
  placeholder,
  width,
}) => (
  <View style={[styles.YBInputStyle, { width }]}>
    <TextInput
      style={styles.text}
      placeholder={placeholder}
      underlineColorAndroid={colors.inputBackgroundColor}
      clearButtonMode='while-editing'
    />
  </View>
);

YBInput.propTypes = {
  placeholder: PropTypes.string,
  width: PropTypes.number,
};

YBInput.defaultProps = {
  placeholder: null,
  width: 300,
};

export default YBInput;
