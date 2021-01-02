import { combineReducers } from '@reduxjs/toolkit';
import RegisterReducer from '../auth/AuthRegStoreSlice';

const rootReducer = combineReducers({
  hospitalDetails: RegisterReducer,
});

export default rootReducer;
