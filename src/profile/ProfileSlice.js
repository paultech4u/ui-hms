import { createSlice } from '@reduxjs/toolkit';

const ProfileReducer = createSlice({
  name: 'profile',
  initialState: {
    edit: false,
  },
  reducers: {
    toggleEditMode: {
      reducer: (state, action) => {},
    },
  },
});

const { actions, reducer } = ProfileReducer;

export const { toggleEditMode } = actions;

export default reducer;
