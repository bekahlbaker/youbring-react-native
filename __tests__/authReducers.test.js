import * as authActions from '../src/actions/auth.actions';
import reducer from '../src/reducers/user.reducer';

/* eslint-disable no-unused-expressions */


// test test :)
const testValue = 'This is the test value for the reducer test';

describe('Auth Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it('should handle TEST', () => {
    expect(
      reducer(
        undefined,
        {
          payload: testValue,
          type: authActions.TEST,
        },
      )).toEqual(testValue);
  });

  it('should handle NEW_USER', () => {
    expect(
      reducer(
        undefined,
        {
          payload: testValue,
          type: authActions.NEW_USER,
        },
      )).toEqual(testValue);
  });

  it('should handle EMAIL_AUTH', () => {
    expect(
      reducer(
        undefined,
        {
          payload: testValue,
          type: authActions.EMAIL_AUTH,
        },
      )).toEqual(testValue);
  });
});
