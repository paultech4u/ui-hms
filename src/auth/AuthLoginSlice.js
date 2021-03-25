import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserAPI } from './AuthAPI';
import { AuthStatus, LoadingStatus } from '../constants';

export const loginAction = createAsyncThunk(
  'auth/login',
  async (data, thunkAPI) => {
    return Login(await loginUserAPI(data), thunkAPI);
  }
);

const AuthReducer = createSlice({
  name: 'auth',
  initialState: {
    error: null,
    token: null,
    success: null,
    openAlert: false,
    openLogoutAlert: false,
    isLoading: LoadingStatus.IDLE,
    isAuthenticated: false
      ? AuthStatus.AUTHENTICATED
      : AuthStatus.UNAUTHENTICATED,
  },
  reducers: {
    login: {
      reducer: (state, action) => {
        if (action.error) {
          if (action.payload === 'Server error') {
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
        state.error = null;
        state.token = null;
        state.success = null;
        state.openLogoutAlert = true;
        state.isAuthenticated = action.payload;
        state.isLoading = LoadingStatus.IDLE;
      },
    },
    handleAlertClose: {
      reducer: (state, action) => {
        state.openAlert = action.payload;
        state.error = null;
        state.token = null;
      },
    },
    handleLogoutAlert: {
      reducer: (state, action) => {
        state.openLogoutAlert = action.payload;
        state.error = null;
        state.token = null;
      },
    },
  },
  extraReducers: {
    [loginAction.pending]: (state, action) => {
      state.isLoading = LoadingStatus.PENDING;
    },
    [loginAction.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.success = action.payload.message;
      state.isLoading = LoadingStatus.IDLE;
    },
    [loginAction.rejected]: (state, action) => {
      state.openAlert = true;
      if (action.payload === 'undefined' || action.error.name === 'TypeError') {
        state.error = action.payload;
      } else {
        state.error = action.payload.message;
      }
      state.isAuthenticated = false;
      state.isLoading = LoadingStatus.IDLE;
    },
  },
});

const Login = (res, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  if (res.status === 500) {
    return rejectWithValue('Server error');
  } else if (res.status >= 300) {
    return rejectWithValue(res.data.error);
  } else {
    dispatch(login(res.data));
    return res.data;
  }
};

const { actions, reducer } = AuthReducer;

export const { login, logout, handleAlertClose, handleLogoutAlert } = actions;

export default reducer;
