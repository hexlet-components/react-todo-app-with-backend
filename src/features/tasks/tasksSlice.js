// @ts-check

import { createSlice } from '@reduxjs/toolkit';

import adapter from '../../store/adapter.js';

const slice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState(),
  reducers: {
    add: adapter.addOne,
    update: adapter.upsertOne,
    remove: adapter.removeOne,
  },
});

export const tasksSelectors = adapter.getSelectors((state) => state.tasks);

export const tasksActions = slice.actions;

export default slice.reducer;
