import { INCORRECT_PASSWORD, EMAIL_EXISTS } from '../actions/auth.actions';

export default function (state = null, action) {
  switch (action.type) {
    default: return state;
    case INCORRECT_PASSWORD:
      return action.payload;
    case EMAIL_EXISTS:
      return action.payload;
  }
}
