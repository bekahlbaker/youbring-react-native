import { AsyncStorage } from 'react-native';
/* eslint-disable import/prefer-default-export */

export const NEW_EVENT = 'NEW_EVENT';

const BASE_URL = 'https://youbring-api.herokuapp.com';

let token = '';

AsyncStorage.getItem('Token')
  .then((value) => {
    token = value;
  });

export function newEvent(event) {
  console.log(event);
  return (dispatch) => {
    return fetch(`${BASE_URL}/events/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        name: event.name,
        date: event.date,
      }),
    })
      .then(res => res.json())
      .then((createdEvent) => {
        console.log('Event, ', createdEvent);
        if (createdEvent.success) {
          console.log('Successfully created event');
          dispatch({
            type: NEW_EVENT,
            payload: createdEvent,
          });
        }
      })
      .catch(error => console.log('Error creating event ', error));
  };
}
