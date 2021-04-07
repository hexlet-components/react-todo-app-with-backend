// @ts-nocheck

import { createSlice } from '@reduxjs/toolkit';

import { addTask } from './tasks.js';

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
    [addTask.fulfilled]: (state) => {
      state.text = '';
    },
  },
});

const actions = { ...slice.actions };

export { actions };

export default slice.reducer;
