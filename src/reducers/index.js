import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../auth/AuthStoreSlice';
import ProfileReducer from '../profile/ProfileSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: ProfileReducer,
});

export default rootReducer;
