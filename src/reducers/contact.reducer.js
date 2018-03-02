import { GET_CONTACTS, NEW_CONTACT} from '../actions/contact.actions';

export default function (state = null, action) {
  switch (action.type) {
    default: return state;
    case GET_CONTACTS:
      return action.payload;
    case NEW_CONTACT:
      return action.payload;
  }
}
