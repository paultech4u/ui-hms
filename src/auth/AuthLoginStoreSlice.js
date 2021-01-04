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
  async (token, thunkAPI) => {
    return Logout(await LogoutAPI(token), thunkAPI);
  }
);

const AuthReducer = createSlice({
  name: 'auth',
  initialState: {
    error: '',
    token: null,
    success: '',
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
      },
    },
  },
  extraReducers: {
    [LoginAction.pending]: (state, action) => {
      state.token = null;
      state.error = '';
      state.success = '';
      state.openAlert = false;
      state.isLoading = LoadingStatus.PENDING;
      state.isAuthenticated = false;
    },
    [LoginAction.fulfilled]: (state, action) => {
      state.error = '';
      state.openAlert = false;
      state.token = action.payload;
      state.isAuthenticated = true;
      state.success = action.payload.message;
      state.isLoading = LoadingStatus.IDLE;
    },
    [LoginAction.rejected]: (state, action) => {
      state.token = null;
      state.success = '';
      state.openAlert = true;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.isLoading = LoadingStatus.IDLE;
    },
    [LogoutAction.pending]: (state, action) => {
      state.token = null;
      state.error = '';
      state.isAuthenticated = false;
      state.isLoading = LoadingStatus.PENDING;
    },
    [LogoutAction.fulfilled]: (state, action) => {
      state.error = '';
      state.token = null;
      state.success = '';
      state.isAuthenticated = false;
      state.isLoading = LoadingStatus.IDLE;
    },
    [LogoutAction.rejected]: (state, action) => {
      state.token = null;
      state.success = '';
      state.error = action.payload;
      state.isAuthenticated = false;
      state.isLoading = LoadingStatus.IDLE;
    },
  },
});

const Login = (res, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const { status, data } = res;
  if (status === 500) {
    return rejectWithValue('Internal server error');
  } else if (status >= 300) {
    return rejectWithValue(data.error);
  } else {
    dispatch(login(data));
    return data;
  }
};

const Logout = (res, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const { status, data } = res;
  if (status === 500) {
    return rejectWithValue('Internal server error');
  } else {
    dispatch(logout(data));
    return data;
  }
};

const { actions, reducer } = AuthReducer;

export const { login, logout, handleAlertClose } = actions;

export default reducer;
