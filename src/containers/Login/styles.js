import { Platform } from 'react-native';
import colors from '../../global/colors';
import fonts from '../../global/fonts';

export default styles = {
  mainView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.viewBackgroundColor,
  },
  logo: [{
    marginTop: 80,
  },
  fonts.logoFont],
  loginForm: {
    flex: 1,
    marginTop: 50,
  },
  errorMessage: [{
    color: colors.error,
    textAlign: 'center',
    marginTop: 15,
  },
  fonts.plainText],
  toggleHasAccountButton: {
    alignItems: 'center',
    marginTop: 15,
  },
};
