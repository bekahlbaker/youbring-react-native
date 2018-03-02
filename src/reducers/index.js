import { combineReducers } from 'redux';
import user from './user.reducer';
import userStatus from './userStatus.reducer';
import authError from './authError.reducer';
import events from './event.reducer';
import contacts from './contact.reducer';

const rootReducer = combineReducers({
  user,
  userStatus,
  authError,
  events,
  contacts,
});

export default rootReducer;
