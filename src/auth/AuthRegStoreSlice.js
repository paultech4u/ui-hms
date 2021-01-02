import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterHospitalAPI } from './AuthAPI';
import { LoadingStatus } from '../constants';

export const RegisterAction = createAsyncThunk(
  'hospital/register',
  async (data, thunkAPI) => {
    return RegisterSuccess(await RegisterHospitalAPI(data), thunkAPI);
  }
);

const RegisterReducer = createSlice({
  name: 'hospital',
  initialState: {
    status: null,
    error: null,
    loading: LoadingStatus.IDLE,
  },
  reducers: {
    register: {
      reducer: (state, action) => {
        if (action.error) {
          state.error = action.payload;
        }
        state.status = action.payload;
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RegisterAction.pending, pending);
    builder.addCase(RegisterAction.fulfilled, fullfilled);
    builder.addCase(RegisterAction.rejected, rejected);
  },
});

const RegisterSuccess = (response, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const { status } = response;
  if (status === 302 || status === 401 || status === 404) {
    return rejectWithValue(response.data.error);
  } else if (status === 500) {
    return rejectWithValue(response.data.error);
  } else if (status === 201) {
    dispatch(register(response));
    return response.data;
  }
};

function pending(state, action) {
  state.loading = LoadingStatus.PROGRESS;
}
function fullfilled(state, action) {
  state.loading = LoadingStatus.IDLE;
  state.status = action.payload;
  state.error = null;
}
function rejected(state, action) {
  state.loading = LoadingStatus.IDLE;
  state.error = action.payload;
  state.status = null;
}

const { actions, reducer } = RegisterReducer;

const { register } = actions;

export default reducer;
