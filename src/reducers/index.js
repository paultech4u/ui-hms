import { combineReducers } from '@reduxjs/toolkit';
import RegisterReducer from '../auth/AuthRegStoreSlice';
import AuthReducer from '../auth/AuthLoginStoreSlice';
import UserReducer from '../user/UserStoreSlice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  userInfo: UserReducer,
  reg: RegisterReducer,
});

export default rootReducer;
