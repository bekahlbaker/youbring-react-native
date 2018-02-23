import { NEW_EVENT } from '../actions/event.actions';

export default function (state = null, action) {
  switch (action.type) {
    default: return state;
    case NEW_EVENT:
      return action.payload;
  }
}
