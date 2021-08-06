// @ts-check

import { createSlice } from '@reduxjs/toolkit';
import defaultListId from '../config/index.js';

const slice = createSlice({
  name: 'currentListId',
  initialState: defaultListId,
  reducers: {
    setCurrentListId: (state, action) => action.payload,
  },
});

export const { setCurrentListId } = slice.actions;

export const selectCurrentListId = (state) => state.currentListId;

export default slice.reducer;
