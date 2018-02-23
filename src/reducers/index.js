import { combineReducers } from 'redux';
import user from './user.reducer';
import authError from './authError.reducer';
import events from './event.reducer';

const rootReducer = combineReducers({
  user,
  authError,
  events,
});

export default rootReducer;
