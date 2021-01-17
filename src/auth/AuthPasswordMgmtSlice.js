import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forgetPasswordAPI } from './AuthAPI';
import { LoadingStatus } from '../constants';

export const forgetPasswordAction = createAsyncThunk(
  'password/forget',
  async (data, thunkAPI) => {
    return forgetPassword(await forgetPasswordAPI(data), thunkAPI);
  }
);

const PasswordMgmtReducer = createSlice({
  name: 'password',
  initialState: {
    error: null,
    success: null,
    isLoading: LoadingStatus.IDLE,
  },
  reducers: {
    forget: {
      reducer: (state, action) => {
        if (action.error) {
          if (action.payload === 'Server error') {
            state.error = action.payload;
          }
          state.error = action.payload.message;
        }
        state.success = action.payload.message;
      },
    },
    handleAlert: {
      reducer: (state, action) => {
        state.error = action.payload;
      },
    },
  },
  extraReducers: {
    [forgetPasswordAction.pending]: (state, action) => {
      state.isLoading = LoadingStatus.PENDING;
    },
    [forgetPasswordAction.fulfilled]: (state, action) => {
      state.success = action.payload.message;
      state.isLoading = LoadingStatus.IDLE;
    },
    [forgetPasswordAction.rejected]: (state, action) => {
      if (action.payload === 'undefined' || action.error.name === 'TypeError') {
        state.error = action.payload;
      } else {
        state.error = action.payload.message;
      }
      state.isLoading = LoadingStatus.IDLE;
    },
  },
});

const forgetPassword = (res, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  if (res.status === 500) {
    return rejectWithValue('Server Error');
  } else if (res.status >= 300) {
    return rejectWithValue(res.data.error);
  } else {
    dispatch(forget(res.data));
    return res.data;
  }
};

export const { reducer, actions } = PasswordMgmtReducer;

export const { forget, handleAlert } = actions;

export default reducer;
