/* eslint-disable import/prefer-default-export */

export const NEW_USER = 'NEW_USER';
export const EMAIL_AUTH = 'EMAIL_AUTH';

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
    fetch(`${BASE_URL}/auth/new-user`, {
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
        // save user to localStorage
        console.log('USER', user);
        // dispatch the user
        dispatch({
          type: NEW_USER,
          payload: user,
        });
      })
      .catch(error => console.log('ERROR', error));
  };
}

export function emailAuth(credentials) {
    console.log(credentials);
  return (dispatch) => {
    // post to API with credentials
    fetch(`${BASE_URL}/auth/login`, {
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
        // save user to localStorage

        // dispatch the user
        dispatch({
          type: EMAIL_AUTH,
          payload: user,
        });
      })
      .catch(error => console.log('ERROR', error));
  };
}
