import {
  login,
  addHospital,
  forgetPassword,
  addHospitalAdmin,
} from '../api/authApi';
import { authStatus, loadingStatus } from '../constants';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

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
    return handleRequest(await addHospital(payload), thunkAPI);
  }
);

export const registerHospitalAdminAction = createAsyncThunk(
  'auth/register_admin',
  async (payload, thunkAPI) => {
    return handleRequest(await addHospitalAdmin(payload), thunkAPI);
  }
);

export const logoutAction = createAction('auth/logout');

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    error: null,
    username: null,
    accessToken: null,
    isLoading: loadingStatus.IDLE,
    isAuthenticated: false
      ? authStatus.AUTHENTICATED
      : authStatus.UNAUTHENTICATED,
  },
  reducers: {
    success(state, action) {
      state.isLoading = loadingStatus.IDLE;
    },
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
  state.username = null;
  state.accessToken = null;
  state.isLoading = loadingStatus.PENDING;
}

function fulfilled(state, action) {
  const { access_token, username } = action.payload;

  state.username = username;
  state.isAuthenticated = true;
  state.accessToken = access_token;
  state.isLoading = loadingStatus.SUCCESS;
}

function rejected(state, action) {
  if (action.payload === 'undefined' || action.error.name === 'TypeError') {
    state.error = undefined;
    state.isLoading = loadingStatus.IDLE;
  } else {
    state.username = null;
    state.isAuthenticated = false;
    state.error = action.payload.message;
    state.isLoading = loadingStatus.IDLE;
  }
}

function clearError(state) {
  state.error = null;
  state.username = null;
  state.accessToken = null;
  state.isAuthenticated = false;
  state.isLoading = loadingStatus.IDLE;
}

export const {
  clearError: clearErrorAction,
  success: successAction,
} = authReducer.actions;

export default authReducer.reducer;
