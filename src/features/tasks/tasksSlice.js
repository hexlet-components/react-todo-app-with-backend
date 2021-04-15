// @ts-check

import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { sortBy } from 'lodash';

import routes from '../../api/routes.js';
import adapter from '../../store/adapter.js';

const fetchAll = createAsyncThunk('tasks/fetchAll', async () => {
  const url = routes.listTasks();
  const response = await axios.get(url);
  return response.data.tasks;
});

const create = createAsyncThunk('tasks/create', async ({ text, listId }) => {
  const url = routes.tasks();
  const response = await axios.post(url, { text, listId });
  return response.data;
});

const update = createAsyncThunk('tasks/update', async ({ id, completed }) => {
  const url = routes.task(id);
  const response = await axios.patch(url, { completed });
  return response.data;
});

const remove = createAsyncThunk('tasks/remove', async ({ id }) => {
  const url = routes.task(id);
  const response = await axios.delete(url);
  return response.data;
});

const slice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchAll.fulfilled]: adapter.setAll,
    [create.fulfilled]: adapter.addOne,
    [update.fulfilled]: adapter.upsertOne,
    [remove.fulfilled]: adapter.removeOne,
  },
});

export const adapterSelectors = adapter.getSelectors((state) => state.tasks);
const selectSorted = createSelector(adapterSelectors.selectAll, (tasks) => {
  return sortBy(tasks, ['completed', 'id']);
});

export const tasksSelectors = { ...adapterSelectors, selectSorted };

export const tasksActions = {
  ...slice.actions,
  fetchAll,
  remove,
  create,
  update,
};

export default slice.reducer;
