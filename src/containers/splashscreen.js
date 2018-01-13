import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { Content, View, Button, Text, Container } from 'native-base';
import fonts from '../FONTS';
import colors from '../COLORS';
import styles from '../GLOBAL_STYLES';

/* eslint-disable react/prop-types, react/jsx-filename-extension */

const splashScreenStyles = {
  welcomeText: [{
    textAlign: 'center',
    color: colors.white,
  }, fonts.extraBold36],
  splashscreenContainer: {
    backgroundColor: colors.navy,
    justifyContent: 'center',
  },
};

const SplashScreen = () => (
  <Container style={splashScreenStyles.splashscreenContainer}>
    <Text style={splashScreenStyles.welcomeText}>
    Welcome to YouBring!
    </Text>
  </Container>
);

export default SplashScreen;
