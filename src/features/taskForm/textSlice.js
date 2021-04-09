// @ts-check

import { createSlice } from '@reduxjs/toolkit';
import { addTask } from '../tasks/tasksSlice.js';

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
  extraReducers: (builder) => {
    builder.addCase(addTask, (state) => {
      state.text = '';
    });
  },
});

export const { updateText } = slice.actions;

export default slice.reducer;
