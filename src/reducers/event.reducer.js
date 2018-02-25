import { NEW_EVENT, UPDATED_EVENT } from '../actions/event.actions';

export default function (state = null, action) {
  switch (action.type) {
    default: return state;
    case NEW_EVENT:
      return action.payload;
    case UPDATED_EVENT:
      return action.payload;
  }
}
