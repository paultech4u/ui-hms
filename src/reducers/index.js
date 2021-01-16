import { combineReducers } from '@reduxjs/toolkit';
import RegisterReducer from '../auth/AuthRegStoreSlice';
import AuthReducer from '../auth/AuthLoginStoreSlice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  reg: RegisterReducer,
});

export default rootReducer;
