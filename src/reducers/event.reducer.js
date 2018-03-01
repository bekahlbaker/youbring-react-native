import { GET_EVENTS, NEW_EVENT, UPDATED_EVENT, DELETE_EVENT } from '../actions/event.actions';

export default function (state = null, action) {
  switch (action.type) {
    default: return state;
    case GET_EVENTS:
      return action.payload;
    case NEW_EVENT:
      return action.payload;
    case UPDATED_EVENT:
      return action.payload;
    case DELETE_EVENT:
      return action.payload;
  }
}
