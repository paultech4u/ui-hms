import { getProfileDetails } from '../api';
import { loadingStatus } from '../constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProfileDetailAction = createAsyncThunk(
  'auth/register_admin',
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
    clearError,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getProfileDetailAction.pending, pending)
      .addCase(getProfileDetailAction.fulfilled, fulfilled)
      .addCase(getProfileDetailAction.rejected, rejected),
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
  state.user = action.payload;
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
  state.error = null;
  state.isLoading = loadingStatus.IDLE;
}

export const { clearError: clearErrorAction } = ProfileReducer.actions;

export default ProfileReducer.reducer;
