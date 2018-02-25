import { AsyncStorage } from 'react-native';
/* eslint-disable import/prefer-default-export */

export const NEW_EVENT = 'NEW_EVENT';
export const UPDATED_EVENT = 'UPDATED_EVENT';

const BASE_URL = 'https://youbring-api.herokuapp.com';

export function newEvent(event, token) {
  console.log(event);
  return (dispatch) => {
    return fetch(`${BASE_URL}/events/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        newEvent: {
          name: event.name,
          date: event.date,
          description: event.description,
        },
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

export function updateEvent(event, token, eventId) {
  console.log(event);
  return (dispatch) => {
    return fetch(`${BASE_URL}/events/${eventId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        updatedEvent: {
          name: event.name,
          date: event.date,
          description: event.description,
        },
      }),
    })
      .then(res => res.json())
      .then((createdEvent) => {
        console.log('Event, ', createdEvent);
        if (createdEvent.success) {
          console.log('Successfully created event');
          dispatch({
            type: UPDATED_EVENT,
            payload: createdEvent,
          });
        }
      })
      .catch(error => console.log('Error creating event ', error));
  };
}
