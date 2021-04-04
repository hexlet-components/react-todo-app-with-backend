// @ts-check

import { createSlice } from '@reduxjs/toolkit';

import { actions as tasksActions } from './tasks.js';

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
    builder.addCase(tasksActions.addTask, (state) => {
      state.text = '';
    });
  },
});

const actions = { ...slice.actions };

export { actions };

export default slice.reducer;
