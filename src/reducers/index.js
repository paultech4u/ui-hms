import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../auth/AuthStoreSlice';
import profileReducer from '../profile/ProfileStoreSlice';
import dashboardReducer from '../dashboard/DashboardStoreSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
