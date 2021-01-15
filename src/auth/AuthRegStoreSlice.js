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
  extraReducers: {
    [RegisterAction.pending]: (state, action) => {
      state.isLoading = LoadingStatus.PENDING;
    },
    [RegisterAction.fulfilled]: (state, action) => {
      state.error = '';
      state.open = true;
      state.success = action.payload;
      state.isLoading = LoadingStatus.IDLE;
    },
    [RegisterAction.rejected]: (state, action) => {
      state.open = true;
      state.success = '';
      state.error = action.payload;
      state.isLoading = LoadingStatus.IDLE;
    },
  },
});

const RegisterSuccess = (res, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  if (res.status === 500) {
    return rejectWithValue('Internal server error');
  } else if (res.status >= 300) {
    return rejectWithValue(res.data.error);
  } else {
    dispatch(register(res));
    return res.data;
  }
};

const { actions, reducer } = RegisterReducer;

export const { register, handleAlertClose } = actions;

export default reducer;
