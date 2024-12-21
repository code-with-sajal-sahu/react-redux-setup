import { combineReducers } from 'redux';
import UserReducer from './user/userSlice';

const rootReducer = combineReducers({
  UserReducer : UserReducer,
});

export default rootReducer;
