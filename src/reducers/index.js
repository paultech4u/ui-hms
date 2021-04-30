import { combineReducers } from '@reduxjs/toolkit';
import appReducer from '../AppStoreSlice';
import authReducer from '../auth/AuthStoreSlice';
import profileReducer from '../profile/ProfileStoreSlice';
import dashboardReducer from '../dashboard/DashboardStoreSlice';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
