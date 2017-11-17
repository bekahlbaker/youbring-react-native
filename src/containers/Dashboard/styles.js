import { Dimensions } from 'react-native';
import colors from '../../global/colors';
import fonts from '../../global/fonts';

export default styles = {
  mainView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.viewBackgroundColor,
  },
  header: {
    backgroundColor: colors.darkTextColor,
    height: 75,
    width: Dimensions.get('window').width - 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    borderRadius: 10,
  },
  headerAddImage: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  headerText: [{
    color: colors.lightTextColor,
  }, fonts.buttonFont],
  listItemDefault: {
    backgroundColor: colors.mainColor,
    height: 100,
    width: Dimensions.get('window').width - 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
  },
  listItemCompleted: {
    backgroundColor: colors.inputBackgroundColor,
    height: 100,
    width: Dimensions.get('window').width - 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
  },
  listItemText: [{
    color: colors.lightTextColor,
    marginTop: 5,
  }, fonts.plainText],
};
