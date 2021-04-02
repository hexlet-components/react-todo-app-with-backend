// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    initTasks: (state, { payload: { tasks } }) => {
      state.tasks = [...tasks];
    },
    addTask: (state, { payload: { task } }) => {
      state.tasks.unshift(task);
    },
    removeTask: (state, { payload }) => {
      console.log(payload)
      state.tasks = state.tasks.filter((task) => task.id !== payload.id);
    },
    toggleTaskState: (state, { payload: { task } }) => {
      const currentItem = state.tasks.find(({ id }) => id === task.id);
      currentItem.completed = task.completed;
    },
  },
});

const actions = { ...slice.actions };

export { actions };

export default slice.reducer;
