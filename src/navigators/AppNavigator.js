import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import Login from '../../src/containers/Login/index';
import Dashboard from '../../src/containers/Dashboard/index';
import Details from '../../src/containers/Details/index';
import Settings from '../../src/containers/Settings/index';
import Create from '../../src/containers/Create/index';
import Contacts from '../../src/containers/Contacts/index';
import colors from '../../src/global/colors';

const RootTabs = TabNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarLabel: 'Events',
      tabBarIcon: () => <Icon name="home" size={26} />,
      activeTintColor: colors.darkTextColor,
      inactiveTintColor: colors.placeholderTextColor,
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <Icon name="settings" size={26} color={tintColor} />,
    },
  },
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      tabBarLabel: 'Contacts',
      tabBarIcon: ({ tintColor }) => <Icon name="contacts" size={26} color={tintColor} />,
    },
  },
});

const RootNavigator = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Dashboard: {
    screen: RootTabs,
  },
  Settings: {
    screen: Settings,
  },
  Details: {
    screen: Details,
  },
  Create: {
    screen: Create,
  },
  Contacts: {
    screen: Contacts,
  },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <RootNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
