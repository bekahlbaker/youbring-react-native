import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StackNavigator } from 'react-navigation';
import Login from './src/containers/Login/login';
import Dashboard from './src/containers/Dashboard/dashboard';
import reducers from './src/reducers';


/* eslint-disable react/jsx-filename-extension, react/prop-types */

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);

const SimpleApp = StackNavigator(
  {
    Login: { screen: Login },
    Dashboard: { screen: Dashboard },
  },
  { headerMode: 'screen' },
);

const App = () => {
  return (
    <Provider store={createStoreWithMiddleWare(reducers)}>
      <SimpleApp />
    </Provider>
  );
};

export default App;
