import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../global/colors';
import fonts from '../global/fonts';

/* eslint-disable react/jsx-filename-extension, no-console, jsx-quotes */

const styles = {
  YBLabelStyle: {
    backgroundColor: null,
    borderBottomColor: colors.placeholderTextColor,
  },
  title: [{
    color: colors.mainColor,
    marginTop: 15,
    paddingBottom: 5,
  }, fonts.plainText],
  text: [{
    color: colors.placeholderTextColor,
    marginTop: 5,
    marginLeft: 5,
    paddingBottom: 3,
  }, fonts.plainText],
  zero: {
    marginTop: 0,
    marginLeft: 0,
    paddingBottom: 0,
    backgroundColor: 'red',
    height: 0,
  },
};

const YBLabel = ({
  width,
  title,
  text,
  borderBottomWidth,
}) => (
  <View style={[styles.YBLabelStyle, { width, borderBottomWidth }]}>
    <Text style={styles.title}>{title}</Text>
    <Text style={text === null ? styles.zero : styles.text}>{text}</Text>
  </View>
);

YBLabel.propTypes = {
  width: PropTypes.number,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  borderBottomWidth: PropTypes.number,
};

YBLabel.defaultProps = {
  width: 300,
  text: null,
  borderBottomWidth: 1,
};

export default YBLabel;
