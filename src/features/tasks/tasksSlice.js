import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes.js';
import adapter from './adapter.js';

export const fetchTasksByListId = createAsyncThunk(
  'tasks/fetchTasksByListId',
  async ({ currentListId }) => {
    const url = routes.listTasks(currentListId);
    const response = await axios.get(url);
    console.log('fetchTasksByListIdThunk response.data -', response.data);
    return response.data.tasks;
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async ({ text, listId }) => {
    const url = routes.tasks();
    const response = await axios.post(url, { text, listId });
    console.log('addTaskThunk response.data -', response.data);
    return response.data.task;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, completed }) => {
    const url = routes.task(id);
    const response = await axios.patch(url, { completed });
    console.log('updateTaskThunk response -', response);
    return response.data.task;
  }
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async ({ id }) => {
    const url = routes.task(id);
    const response = await axios.delete(url);
    console.log('removeTaskThunk response -', response);
    return id;
  }
);

const slice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchTasksByListId.fulfilled]: adapter.setAll,
    [addTask.fulfilled]: adapter.addOne,
    [updateTask.fulfilled]: adapter.upsertOne,
    [removeTask.fulfilled]: adapter.removeOne,
  },
});

export const tasksSelectors = adapter.getSelectors((state) => state.tasks);
export const tasksThunks = {
  fetchTasksByListId,
  addTask,
  updateTask,
  removeTask,
};

const actions = { ...slice.actions };

export { actions };

export default slice.reducer;
