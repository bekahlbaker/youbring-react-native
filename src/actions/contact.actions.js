
/* eslint-disable import/prefer-default-export */

export const GET_CONTACTS = 'GET_CONTACTS';
export const NEW_CONTACT = 'NEW_CONTACT';
// export const UPDATED_EVENT = 'UPDATED_EVENT';
// export const DELETE_EVENT = 'DELETE_EVENT';

const BASE_URL = 'https://youbring-api.herokuapp.com';

export function getContacts(token) {
  return (dispatch) => {
    return fetch(`${BASE_URL}/contacts`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(res => res.json())
      .then((response) => {
        console.log('Contacts, ', response);
        if (response.success) {
          const contacts = response.contacts;
          dispatch({
            type: GET_CONTACTS,
            payload: contacts,
          });
        }
      })
      .catch(error => console.log('Error fetching contacts ', error));
  };
}

export function newContact(contact, token) {
  console.log(contact);
  return (dispatch) => {
    return fetch(`${BASE_URL}/contacts/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        newContact: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          email: contact.email,
        },
      }),
    })
      .then(res => res.json())
      .then((createdContact) => {
        console.log('Contacts, ', createdContact.contacts);
        if (createdContact.success) {
          console.log('Successfully created contact');
          dispatch({
            type: NEW_CONTACT,
            payload: createdContact.contacts,
          });
        }
      })
      .catch(error => console.log('Error creating contact ', error));
  };
}
