import { Platform, Dimensions } from 'react-native';
import t from 'tcomb-form-native';

import colors from './COLORS';
import fonts from './FONTS';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default styles = {
  // Containers and Views
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  scrollView: {
    alignItems: 'center',
    margin: 10,
    padding: 20,
    paddingBottom: 50,
  },
  // Buttons
  orangeButton: {
    backgroundColor: colors.orange,
    width: 300,
    height: 45,
    borderRadius: 3,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  orangeButtonText: [{
    color: colors.white,
    letterSpacing: 0.31,
  }, fonts.semiBold15],
  facebookButton: {
    backgroundColor: colors.lightBlue,
    width: 300,
    height: 45,
    borderRadius: 3,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  facebookButtonText: [{
    color: colors.white,
    letterSpacing: 0.31,
  }, fonts.semiBold15],
  buttonTextOnly: [{
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.lightBlue,
    textDecorationLine: 'underline',
  }, fonts.regular15],
  rightBarButtonText: [{
    color: colors.white,
    paddingRight: 16,
  }, fonts.Regular17],
  // Form Styles
  formStyles: {
    ...t.form.Form.stylesheet,
    formGroup: {
      normal: {
        width: deviceWidth - 64,
        marginTop: 10,
      },
      error: {
        width: deviceWidth - 64,
        marginTop: 10,
      },
    },
    controlLabel: {
      normal: [{
        color: colors.navy,
        marginLeft: 5,
        marginBottom: 10,
        marginTop: 30,
        letterSpacing: 0.31,
      }, fonts.regular15],
      error: [{
        color: colors.error,
        marginLeft: 5,
        marginBottom: 10,
        marginTop: 30,
        letterSpacing: 0.31,
      }, fonts.regular15],
    },
    textbox: {
      normal: [{
        backgroundColor: colors.white,
        borderColor: colors.lightGray,
        borderBottomWidth: 1,
        height: 30,
        color: colors.mediumGray,
        paddingLeft: 8,
      }, fonts.regular15],
      // the style applied when a validation error occours
      error: [{
        backgroundColor: colors.white,
        borderColor: colors.error,
        borderBottomWidth: 1,
        height: 30,
        color: colors.mediumGray,
        paddingLeft: 8,
      }, fonts.regular15],
    },
    errorBlock: [{
      marginBottom: 2,
      color: colors.error,
      paddingLeft: 4,
      paddingTop: 4,
    }, fonts.regular13],
  },
  // Views and Inputs
  checkBox: {
    borderColor: colors.white,
    height: 30,
    backgroundColor: colors.white,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Text
  gray13Text: [{
    color: colors.mediumGray,
  }, fonts.regular13],
  logoText: [{
    color: colors.navy,
  }, fonts.extraBold36],
};
