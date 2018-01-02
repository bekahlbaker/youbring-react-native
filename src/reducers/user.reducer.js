import { NEW_USER } from '../actions/auth.actions';

export default function (state = null, action) {
  switch (action.type) {
    default: return state;
    case NEW_USER:
      return action.payload;
  }
}
