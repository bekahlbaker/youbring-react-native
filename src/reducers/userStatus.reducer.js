import { NEW_USER, EMAIL_AUTH, FACEBOOK_AUTH } from '../actions/auth.actions';

export default function (state = null, action) {
  switch (action.type) {
    default: return state;
    case NEW_USER:
      return action.type;
    case EMAIL_AUTH:
      return action.type;
    case FACEBOOK_AUTH:
      return action.type;
  }
}
