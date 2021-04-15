// @ts-check

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../../api/routes.js';
import adapter from '../../store/adapter.js';

export const fetchAll = createAsyncThunk('lists/fetchAll', async () => {
  const url = routes.lists();
  const response = await axios.get(url);
  return response.data;
});

export const create = createAsyncThunk('lists/create', async ({ text }) => {
  const url = routes.lists();
  const response = await axios.post(url, { text });
  return response.data;
});

export const remove = createAsyncThunk('lists/remove', async ({ id }) => {
  const url = routes.list(id);
  const response = await axios.delete(url);
  return response.data;
});

const slice = createSlice({
  name: 'lists',
  initialState: adapter.getInitialState({
    currentListId: 1,
  }),
  reducers: {
    selectList: (state, { payload }) => {
      state.currentListId = payload.id;
    },
  },
  extraReducers: {
    [fetchAll.fulfilled]: adapter.setAll,
    [create.fulfilled]: adapter.addOne,
    [remove.fulfilled]: adapter.removeOne,
  },
});

const adapterSelectors = adapter.getSelectors((state) => state.lists);
const selectCurrent = (state) => state.lists.currentListId;

export const listsSelectors = { ...adapterSelectors, selectCurrent };

export const listsActions = { ...slice.actions, fetchAll, create, remove };

export default slice.reducer;
