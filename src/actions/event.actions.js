import { AsyncStorage } from 'react-native';
/* eslint-disable import/prefer-default-export */

export const GET_EVENTS = 'GET_EVENTS';
export const NEW_EVENT = 'NEW_EVENT';
export const UPDATED_EVENT = 'UPDATED_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';

const BASE_URL = 'https://youbring-api.herokuapp.com';

export function getEvents(token) {
  return (dispatch) => {
    return fetch(`${BASE_URL}/events`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(res => res.json())
      .then((response) => {
        console.log('Events, ', response);
        if (response.success) {
          const events = response.events;
          dispatch({
            type: GET_EVENTS,
            payload: events,
          });
        }
      })
      .catch(error => console.log('Error creating event ', error));
  };
}

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
        console.log('Events, ', createdEvent.events);
        if (createdEvent.success) {
          console.log('Successfully created event');
          dispatch({
            type: NEW_EVENT,
            payload: createdEvent.events,
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
        console.log('Events, ', createdEvent.events);
        if (createdEvent.success) {
          console.log('Successfully created event');
          dispatch({
            type: UPDATED_EVENT,
            payload: createdEvent.events,
          });
        }
      })
      .catch(error => console.log('Error creating event ', error));
  };
}

export function deleteEvent(token, eventId) {
  return (dispatch) => {
    return fetch(`${BASE_URL}/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(res => res.json())
      .then((deletedEvent) => {
        console.log('DELETED Event, ', deletedEvent.events);
        if (deletedEvent.success) {
          console.log('Successfully deleted event');
          dispatch({
            type: DELETE_EVENT,
            payload: deletedEvent.events,
          });
        }
      })
      .catch(error => console.log('Error deleting event ', error));
  };
}
