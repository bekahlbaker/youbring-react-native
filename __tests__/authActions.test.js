import * as authActions from '../src/actions/auth.actions';

import configureMockStore from 'redux-mock-store'; // mock store
import thunk from 'redux-thunk';

/* eslint-disable no-undef */

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// test test :)
const testValue = 'This is the test value to return';

const credentials = {
  email: 'email@email.com',
  password: '123456',
};

const user = {
  success: true,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJyNXZsa2pieTV1ODFpIiwiaWF0IjoxNTE0OTI5MzgxLCJleHAiOjE2ODc3MjkzODF9.74fJrUjFbOaqKIj--rbzfApDtDYPWxd9aL2RokS8RS8',
  user: {
    userId: 'br5vlkjby5u81i',
    events: [],
    contact: [],
  },
};

describe('Test Action', () => {
  it('should run test action', () => {
    const expectedAction = {
      payload: testValue,
      type: authActions.TEST,
    };
    expect(authActions.test(testValue)).toEqual(expectedAction);
  });
});

// test email auth
describe('Email Auth', () => {
  it('dispatches user on successful fetch request', () => {
    fetch.mockResponse(JSON.stringify(user));
    const expectedAction = [
      {
        type: authActions.EMAIL_AUTH,
        payload: user,
      },
    ];
    const store = mockStore({ config: { user: {} } });

    return store.dispatch(authActions.emailAuth(credentials))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
});

// test new user
describe('New User', () => {
  it('dispatches user on successful fetch request', () => {
    fetch.mockResponse(JSON.stringify(user));
    const expectedAction = [
      {
        type: authActions.NEW_USER,
        payload: user,
      },
    ];
    const store = mockStore({ config: { user: {} } });

    return store.dispatch(authActions.newUser(credentials))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
});
