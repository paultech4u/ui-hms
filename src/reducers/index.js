import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../auth/AuthStoreSlice';
import ProfileReducer from '../profile/ProfileStoreSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: ProfileReducer,
});

export default rootReducer;
