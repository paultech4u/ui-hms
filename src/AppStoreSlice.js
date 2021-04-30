import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    drawer: false,
  },
  reducers: {
    openDrawer(state, action) {
      state.drawer = action.payload;
    },
    closeDrawer(state, action) {
      state.drawer = action.payload;
    },
  },
});

export const { openDrawer, closeDrawer } = slice.actions;

export default slice.reducer;
