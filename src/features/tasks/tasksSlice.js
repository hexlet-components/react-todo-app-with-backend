// @ts-check

import { createSlice, createSelector } from '@reduxjs/toolkit';

import adapter from '../../store/adapter.js';
import { selectCurrentListId } from '../../store/currentListIdSlice.js';

const slice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState(),
  reducers: {
    add: adapter.addOne,
    update: adapter.upsertOne,
    remove: adapter.removeOne,
  },
});

const adapterSelectors = adapter.getSelectors((state) => state.tasks);

const selectByCurrentListId = createSelector(
  adapterSelectors.selectAll,
  selectCurrentListId,
  (tasks, currentListId) => {
    return tasks.filter((task) => task.listId === currentListId);
  }
);

export const tasksSelectors = { selectByCurrentListId, ...adapterSelectors };

export const tasksActions = slice.actions;

export default slice.reducer;
