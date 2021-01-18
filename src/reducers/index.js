import { combineReducers } from '@reduxjs/toolkit';
import RegisterReducer from '../auth/AuthRegSlice';
import AuthReducer from '../auth/AuthLoginSlice';
import ProfileReducer from '../profile/ProfileSlice';
import PasswordMgmtReducer from '../auth/AuthPasswordMgmtSlice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  reg: RegisterReducer,
  profile: ProfileReducer,
  password: PasswordMgmtReducer,
});

export default rootReducer;
