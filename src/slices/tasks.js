// @ts-nocheck

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes.js';

export const addTaskThunk = createAsyncThunk(
  'tasks/addTask',
  async ({ text, listId }) => {
    const url = routes.tasks();
    const response = await axios.post(url, { text, listId });
    console.log('addTaskThunk response.data -', response.data);
    return response.data;
  }
);

export const removeTaskThunk = createAsyncThunk(
  'tasks/removeTask',
  async ({ id }) => {
    const url = routes.task(id);
    const response = await axios.delete(url);
    console.log('removeTaskThunk response -', response);
    return id;
  }
);

export const toggleTaskStateThunk = createAsyncThunk(
  'tasks/toggleTaskState',
  async ({ id, completed }) => {
    const url = routes.task(id);
    const response = await axios.patch(url, { completed });
    console.log('toggleTaskStateThunk response -', response);
    return response.data;
  }
);

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
    },
  },
  extraReducers: {
    [addTaskThunk.pending]: (state, action) => {
      console.log('addTaskThunk pending -', action);
    },
    [addTaskThunk.fulfilled]: (state, action) => {
      console.log('addTaskThunk fulfilled', action);
      const { task } = action.payload;
      state.tasks.unshift(task);
    },
    [addTaskThunk.rejected]: (state, action) => {
      console.log('addTaskThunk rejected -', action);
    },
    [removeTaskThunk.pending]: (state, action) => {
      console.log('removeTaskThunk pending -', action);
    },
    [removeTaskThunk.fulfilled]: (state, action) => {
      console.log('removeTaskThunk fulfilled -', action);
    },
    [removeTaskThunk.rejected]: (state, action) => {
      console.log('removeTaskThunk rejected -', action);
    },
    [toggleTaskStateThunk.pending]: (state, action) => {
      console.log('toggleTaskStateThunk pending -', action);
    },
    [toggleTaskStateThunk.fulfilled]: (state, action) => {
      console.log('toggleTaskStateThunk fulfilled -', action);
      const { task } = action.payload;
      const currentItem = state.tasks.find(({ id }) => id === task.id);
      currentItem.completed = task.completed;
    },
    [toggleTaskStateThunk.rejected]: (state, action) => {
      console.log('toggleTaskStateThunk rejected -', action);
    },
  },
});

const actions = { ...slice.actions };

export { actions };

export default slice.reducer;
