import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes.js';
import adapter from './adapter.js';

export const fetchAllTasks = createAsyncThunk(
  'tasks/fetchAllTasks',
  async () => {
    const url = routes.tasks();
    const response = await axios.get(url);
    console.log('fetchAllTasksThunk response.data -', response.data);
    return response.data.tasks;
  }
);

export const fetchTasksByListId = createAsyncThunk(
  'tasks/fetchTasksByListId',
  async ({ currentListId }) => {
    const url = routes.listTasks(currentListId);
    const response = await axios.get(url);
    console.log('fetchTasksByListIdThunk response.data -', response.data);
    return response.data.tasks;
  }
);

// export const fetchTasks = createAsyncThunk(
//   'tasks/fetchTasks',
//   async ({ currentListId }) => {
//     const url = currentListId
//       ? routes.listTasks(currentListId)
//       : routes.tasks();
//     const response = await axios.get(url);
//     console.log('fetchTasksThunk response.data -', response.data);
//     return response.data.tasks;
//   }
// );

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
    console.log('deleteTaskThunk response -', response);
    return id;
  }
);

const slice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchAllTasks.fulfilled]: adapter.setAll,
    [fetchTasksByListId.fulfilled]: adapter.setAll,
    [addTask.fulfilled]: adapter.addOne,
    [updateTask.fulfilled]: adapter.upsertOne,
    [removeTask.fulfilled]: adapter.removeOne,
  },
});

export const tasksSelectors = adapter.getSelectors((state) => state.tasks);
export const tasksThunks = {
  fetchAllTasks,
  fetchTasksByListId,
  addTask,
  updateTask,
  removeTask,
};

const actions = { ...slice.actions };

export { actions };

export default slice.reducer;
