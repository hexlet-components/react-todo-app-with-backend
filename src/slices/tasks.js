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
      state.tasks = state.tasks.filter((task) => task.id !== payload.id);
    },
    toggleTaskState: (state, { payload: { task } }) => {
      const currentItem = state.tasks.find(({ id }) => id === task.id);
      currentItem.completed = task.completed;

      const sortTasks = (prevTask, nextTask) => {
        const prevTaskId = Number(prevTask.id);
        const nextTaskId = Number(nextTask.id);
        return prevTaskId - nextTaskId;
      };

      const completedTasks = state.tasks
        .filter((t) => t.completed)
        .sort(sortTasks);

      const activeTasks = state.tasks
        .filter((t) => !t.completed)
        .sort(sortTasks);

      state.tasks = [...activeTasks, ...completedTasks];
    },
  },
});

const actions = { ...slice.actions };

export { actions };

export default slice.reducer;
