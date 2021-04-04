// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, { payload: { task } }) => {
      state.tasks.unshift(task);
    },
    removeTask: (state, { payload }) => {
      state.tasks = state.tasks.filter(({ id }) => id !== payload.id);
    },
    toggleTaskState: (state, { payload }) => {
      const currentItem = state.tasks.find(({ id }) => id === payload.id);
      currentItem.completed = !currentItem.completed;
    },
  },
});

const actions = { ...slice.actions };

export { actions };

export default slice.reducer;
