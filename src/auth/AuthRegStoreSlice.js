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
    success: '',
    error: '',
    open: false,
    isLoading: LoadingStatus.IDLE,
  },
  reducers: {
    register: {
      reducer: (state, action) => {
        if (action.error) {
          state.error = action.payload.message;
        }
        state.success = action.payload.message;
      },
    },
    handleAlertClose: {
      reducer: (state, action) => {
        state.open = action.payload;
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RegisterAction.pending, pending);
    builder.addCase(RegisterAction.fulfilled, fullfilled);
    builder.addCase(RegisterAction.rejected, rejected);
  },
});

const RegisterSuccess = (res, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const { status } = res;
  if (status === 302 || status === 401 || status === 404) {
    return rejectWithValue(res.data.error);
  } else if (status === 500) {
    return rejectWithValue(res.data.error);
  } else if (status === 201) {
    dispatch(register(res));
    return res.data;
  }
};

function pending(state, action) {
  state.isLoading = LoadingStatus.PENDING;
}
function fullfilled(state, action) {
  state.error = '';
  state.open = true;
  state.success = action.payload;
  state.isLoading = LoadingStatus.IDLE;
}
function rejected(state, action) {
  state.open = true;
  state.success = '';
  state.error = action.payload;
  state.isLoading = LoadingStatus.IDLE;
}

const { actions, reducer } = RegisterReducer;

export const { register, handleAlertClose } = actions;

export default reducer;
