// @ts-nocheck

import { createSlice } from '@reduxjs/toolkit';

import { addTaskThunk } from './tasks.js';

const slice = createSlice({
  name: 'text',
  initialState: {
    text: '',
  },
  reducers: {
    updateText: (state, { payload: { newText } }) => {
      state.text = newText;
    },
  },
  extraReducers: {
    [addTaskThunk.fulfilled]: (state) => {
      state.text = '';
    },
  },
});

const actions = { ...slice.actions };

export { actions };

export default slice.reducer;
