import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
  login,
  forgetPassword,
  addHospital,
  addHospitalAdmin,
} from './AuthAPI';
import { authStatus, loadingStatus } from '../constants';

export const loginAction = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
    return handleRequest(await login(payload), thunkAPI);
  }
);

export const forgetPasswordAction = createAsyncThunk(
  'auth/forget_password',
  async (payload, thunkAPI) => {
    return handleRequest(await forgetPassword(payload), thunkAPI);
  }
);

export const registerHosptialAction = createAsyncThunk(
  'auth/register_hospital',
  async (payload, thunkAPI) => {
    return handleRequest(await addHospital(payload.hospital), thunkAPI);
  }
);

export const registerHospitalAdminAction = createAsyncThunk(
  'auth/register_admin',
  async (payload, thunkAPI) => {
    return handleRequest(await addHospitalAdmin(payload.admin), thunkAPI);
  }
);

export const logoutAction = createAction('auth/logout');

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    error: null,
    accessToken: null,
    isLoading: loadingStatus.IDLE,
    isAuthenticated: false
      ? authStatus.AUTHENTICATED
      : authStatus.UNAUTHENTICATED,
  },
  reducers: {
    clearError,
  },
  extraReducers: (builder) =>
    builder
      .addCase(loginAction.pending, pending)
      .addCase(loginAction.fulfilled, fulfilled)
      .addCase(loginAction.rejected, rejected)
      .addCase(forgetPasswordAction.pending, pending)
      .addCase(forgetPasswordAction.fulfilled, fulfilled)
      .addCase(forgetPasswordAction.rejected)
      .addCase(logoutAction, clearError),
});

const handleRequest = (response, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  if (response.status === 500) {
    return rejectWithValue('Server error');
  } else if (response.status >= 300) {
    return rejectWithValue(response.data.error);
  } else {
    return response.data;
  }
};

function pending(state, action) {
  state.error = null;
  state.accessToken = null;
  state.isLoading = loadingStatus.PENDING;
}

function fulfilled(state, action) {
  const { access_token } = action.payload;

  state.accessToken = access_token;
  state.isAuthenticated = true;
  state.isLoading = loadingStatus.IDLE;
}

function rejected(state, action) {
  if (action.payload === 'undefined' || action.error.name === 'TypeError') {
    state.error = undefined;
    state.isLoading = loadingStatus.IDLE;
  } else {
    state.isAuthenticated = false;
    state.error = action.payload.message;
    state.isLoading = loadingStatus.IDLE;
  }
}

function clearError(state) {
  state.error = null;
  state.accessToken = null;
  state.isAuthenticated = false;
  state.isLoading = loadingStatus.IDLE;
}

export const { clearError: clearErrorAction } = authReducer.actions;

export default authReducer.reducer;
