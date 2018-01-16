/* eslint-disable import/prefer-default-export */

export const NEW_USER = 'NEW_USER';
export const EMAIL_AUTH = 'EMAIL_AUTH';
export const FACEBOOK_AUTH = 'FACEBOOK_AUTH';
export const INCORRECT_PASSWORD = 'INCORRECT_PASSWORD';
export const EMAIL_EXISTS = 'EMAIL_EXISTS';
export const ACCESS_TOKEN_FAIL = 'ACCESS_TOKEN_FAIL';

const BASE_URL = 'https://youbring-api.herokuapp.com';

/**
 * posts to our API with an email and password
 * get back a JWT and a user, save to localStorage
 * dispatch the user
 * @param {Object} credentials - user login credentials
 */

export function newUser(credentials) {
  console.log(credentials);
  return (dispatch) => {
    // post to API with credentials
    return fetch(`${BASE_URL}/auth/new-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: credentials.email,
        password: credentials.password,
      }),
    })
      .then(res => res.json())
      .then((user) => {
        console.log('USER', user);
        if (user.success) {
          // dispatch the user
          dispatch({
            type: NEW_USER,
            payload: user,
          });
        } else {
          // dispatch error
          console.log('ERROR MESSAGE', user.message);
          dispatch({
            type: EMAIL_EXISTS,
            payload: user.message,
          });
        }
      })
      .catch(error => console.log('ERROR', error));
  };
}

export function emailAuth(credentials) {
  console.log(credentials);
  return (dispatch) => {
    // post to API with credentials
    return fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })
      .then(res => res.json())
      .then((user) => {
        console.log('USER', user);
        if (user.success) {
          // dispatch the user
          dispatch({
            type: EMAIL_AUTH,
            payload: user,
          });
        } else {
          // dispatch error
          dispatch({
            type: INCORRECT_PASSWORD,
            payload: user.message,
          });
        }
      })
      .catch(error => console.log('ERROR', error));
  };
}

export function facebookAuth(token) {
  console.log(token);
  return (dispatch) => {
    // post to API with credentials
    return fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: token,
      }),
    })
      .then(res => res.json())
      .then((user) => {
        console.log('USER', user);
        if (user.success) {
          // dispatch the user
          dispatch({
            type: FACEBOOK_AUTH,
            payload: user,
          });
        } else {
          // dispatch error
          dispatch({
            type: ACCESS_TOKEN_FAIL,
            payload: user.message,
          });
        }
      })
      .catch(error => console.log('ERROR', error));
  };
}
