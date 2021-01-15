import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FetchUserProfileAPI } from './UserAPI';
import { LogoutAction } from '../auth/AuthLoginStoreSlice';

export const FetchUserProfileAction = createAsyncThunk(
  'user/profile',
  async (token, thunkAPI) => {
    return FetchUserProfile(await FetchUserProfileAPI(token), thunkAPI);
  }
);

const UserReducer = createSlice({
  name: 'user',
  initialState: {
    info: null,
    error: null,
  },
  reducers: {
    profile: {
      reducer: (state, action) => {
        if (action.error) {
          state.error = action.payload;
        }
        state.info = action.payload;
      },
    },
  },
  extraReducers: {
    [FetchUserProfileAction.pending]: (state, action) => {
      state.info = null;
      state.error = null;
    },
    [FetchUserProfileAction.fulfilled]: (state, action) => {
      state.error = null;
      state.info = action.payload;
    },
    [FetchUserProfileAction.rejected]: (state, action) => {
      state.info = null;
      state.error = action.payload;
    },
    [LogoutAction.fulfilled]: (state, action) => {
      state.info = null;
      state.error = null;
    },
    [LogoutAction.rejected]: (state, action) => {
      state.info = null;
      state.error = null;
    },
  },
});

const FetchUserProfile = (res, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const { status, data } = res;
  if (status === 500) {
    return rejectWithValue(data.error.message);
  } else if (status >= 300) {
    return rejectWithValue(data.error.message);
  } else {
    dispatch(profile(data));
    return data;
  }
};

const { actions, reducer } = UserReducer;

const { profile } = actions;

export default reducer;
