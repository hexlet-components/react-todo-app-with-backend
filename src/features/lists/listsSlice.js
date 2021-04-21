// @ts-check

import { createSlice } from '@reduxjs/toolkit';

import adapter from '../../store/adapter.js';

const slice = createSlice({
  name: 'lists',
  initialState: adapter.getInitialState(),
  reducers: {
    add: adapter.addOne,
    update: adapter.upsertOne,
    remove: adapter.removeOne,
  },
});

export const listsSelectors = adapter.getSelectors((state) => state.lists);

export const listsActions = slice.actions;

export default slice.reducer;
