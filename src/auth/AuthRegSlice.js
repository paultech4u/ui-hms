import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addHospital, addHospitalAdmin } from './AuthAPI';
import { loadingStatus } from '../constants';

export const registerAction = createAsyncThunk(
  'hospital/register',
  async (data, thunkAPI) => {
    return registerHospital(
      await Promise.all([
        addHospital(data.hospital),
        addHospitalAdmin(data.admin),
      ]),
      thunkAPI
    );
  }
);

const RegisterReducer = createSlice({
  name: 'hospital',
  initialState: {
    success: null,
    error: null,
    open: false,
    isLoading: loadingStatus.IDLE,
  },
  reducers: {
    register: {
      reducer: (state, action) => {
        if (action.error) {
          state.error = action.payload.message;
        }
        state.success = action.payload;
      },
    },
    handleAlertClose: {
      reducer: (state, action) => {
        state.open = action.payload;
      },
    },
  },
  extraReducers: {
    [registerAction.pending]: (state, action) => {
      state.error = null;
      state.isLoading = loadingStatus.PENDING;
    },
    [registerAction.fulfilled]: (state, action) => {
      state.error = null;
      state.open = true;
      state.success = action.payload.message;
      state.isLoading = loadingStatus.IDLE;
    },
    [registerAction.rejected]: (state, action) => {
      state.open = true;
      state.success = null;
      state.error = action.payload.message;
      state.isLoading = loadingStatus.IDLE;
    },
  },
});

const registerHospital = (res, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  if (res[0].status === 500) {
    return rejectWithValue('Network Error');
  } else if (res[0].status >= 300) {
    return rejectWithValue(res[0].data.error);
  } else {
    dispatch(register(res[0].data.message));
    return res[0].data;
  }
};

const { actions, reducer } = RegisterReducer;

export const { register, handleAlertClose } = actions;

export default reducer;
