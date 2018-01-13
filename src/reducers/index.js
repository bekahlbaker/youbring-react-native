import { combineReducers } from 'redux';
import user from './user.reducer';
import authError from './authError.reducer';

const rootReducer = combineReducers({
  user,
  authError,
});

export default rootReducer;
