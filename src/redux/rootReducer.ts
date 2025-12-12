import { combineReducers } from "redux";
// import UserReducer from './user/userSlice';
import AuthReducer from "./features/auth/authSlice";
const rootReducer = combineReducers({
  Auth: AuthReducer,
});

export default rootReducer;
