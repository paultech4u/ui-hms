import { combineReducers } from '@reduxjs/toolkit';
import RegisterReducer from '../auth/AuthRegSlice';
import AuthReducer from '../auth/AuthLoginSlice';
import PasswordMgmtReducer from '../auth/AuthPasswordMgmtSlice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  reg: RegisterReducer,
  password: PasswordMgmtReducer,
});

export default rootReducer;
