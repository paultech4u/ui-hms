import { combineReducers } from '@reduxjs/toolkit';
import RegisterReducer from '../auth/AuthRegSlice';
import AuthReducer from '../auth/AuthLoginSlice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  reg: RegisterReducer,
});

export default rootReducer;
