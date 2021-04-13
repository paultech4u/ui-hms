import { getProfileDetails } from '../api';
import { loadingStatus } from '../constants';
import { logoutAction } from '../auth/AuthStoreSlice';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProfileDetailAction = createAsyncThunk(
  'auth/get-profile',
  async (payload, thunkAPI) => {
    return handleRequest(await getProfileDetails(payload), thunkAPI);
  }
);

const ProfileReducer = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    error: null,
    isLoading: loadingStatus.IDLE,
  },
  reducers: {
    success(state, action) {
      state.isLoading = loadingStatus.IDLE;
    },
    clearError,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getProfileDetailAction.pending, pending)
      .addCase(getProfileDetailAction.fulfilled, fulfilled)
      .addCase(getProfileDetailAction.rejected, rejected)
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
  state.isLoading = loadingStatus.PENDING;
}

function fulfilled(state, action) {
  const { profile } = action.payload;
  state.user = profile;
  state.isLoading = loadingStatus.SUCCESS;
}

function rejected(state, action) {
  if (action.payload === 'undefined' || action.error.name === 'TypeError') {
    state.error = undefined;
    state.isLoading = loadingStatus.IDLE;
  } else {
    state.user = null;
    state.error = action.payload.message;
    state.isLoading = loadingStatus.IDLE;
  }
}

function clearError(state) {
  state.user = null;
  state.error = null;
  state.isLoading = loadingStatus.IDLE;
}

export const {
  clearError: clearErrorAction,
  success: successAction,
} = ProfileReducer.actions;

export default ProfileReducer.reducer;
