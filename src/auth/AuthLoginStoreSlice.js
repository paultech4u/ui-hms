import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginAPI, LogoutAPI } from './AuthAPI';
import { AuthStatus, LoadingStatus } from '../constants';

export const LoginAction = createAsyncThunk(
  'auth/login',
  async (data, thunkAPI) => {
    return Login(await LoginAPI(data), thunkAPI);
  }
);

export const LogoutAction = createAsyncThunk(
  'auth/logout',
  async (user_id, thunkAPI) => {
    return Logout(await LogoutAPI(user_id), thunkAPI);
  }
);

const AuthReducer = createSlice({
  name: 'auth',
  initialState: {
    error: null,
    token: null,
    success: null,
    openAlert: false,
    isLoading: LoadingStatus.IDLE,
    isAuthenticated: false
      ? AuthStatus.AUTHENTICATED
      : AuthStatus.UNAUTHENTICATED,
  },
  reducers: {
    login: {
      reducer: (state, action) => {
        if (action.error) {
          if (action.payload === 'Internal server error') {
            state.error = action.payload;
          }
          state.error = action.payload.message;
          state.isAuthenticated = false;
        }
        state.token = action.payload;
        state.success = action.payload.message;
      },
    },
    logout: {
      reducer: (state, action) => {
        if (action.error) {
          state.token = action.payload;
        }
      },
    },
    handleAlertClose: {
      reducer: (state, action) => {
        state.openAlert = action.payload;
        state.error = null;
      },
    },
  },
  extraReducers: {
    [LoginAction.pending]: (state, action) => {
      state.token = null;
      state.error = null;
      state.success = null;
      state.openAlert = false;
      state.isLoading = LoadingStatus.PENDING;
      state.isAuthenticated = false;
    },
    [LoginAction.fulfilled]: (state, action) => {
      state.error = null;
      state.openAlert = false;
      state.token = action.payload;
      state.isAuthenticated = true;
      state.success = action.payload.message;
      state.isLoading = LoadingStatus.IDLE;
    },
    [LoginAction.rejected]: (state, action) => {
      state.token = null;
      state.success = null;
      state.openAlert = true;
      if (action.payload === 'undefined' || action.error.name === 'TypeError') {
        state.error = action.payload;
      } else {
        state.error = action.payload.message;
      }
      state.isAuthenticated = false;
      state.isLoading = LoadingStatus.IDLE;
    },
    [LogoutAction.pending]: (state, action) => {
      state.token = null;
      state.error = null;
      state.isAuthenticated = false;
      state.isLoading = LoadingStatus.PENDING;
    },
    [LogoutAction.fulfilled]: (state, action) => {
      state.error = null;
      state.token = null;
      state.success = null;
      state.isAuthenticated = false;
      state.isLoading = LoadingStatus.IDLE;
    },
    [LogoutAction.rejected]: (state, action) => {
      state.token = null;
      state.success = null;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.isLoading = LoadingStatus.IDLE;
    },
  },
});

const Login = (res, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  if (res.status === 500) {
    return rejectWithValue('Internal server error');
  } else if (res.status >= 300) {
    return rejectWithValue(res.data.error);
  } else {
    dispatch(login(res.data));
    return res.data;
  }
};

const Logout = (res, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  if (res.status === 500) {
    return rejectWithValue('Internal server error');
  } else {
    dispatch(logout(res.data));
    return res.data;
  }
};

const { actions, reducer } = AuthReducer;

export const { login, logout, handleAlertClose } = actions;

export default reducer;
