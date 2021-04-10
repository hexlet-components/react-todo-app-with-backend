import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes.js';
import adapter from './adapter.js';

export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
  const url = routes.lists();
  const response = await axios.get(url);
  console.log('fetchListsThunk response.data -', response.data);
  return response.data.lists;
});

export const addList = createAsyncThunk('lists/addList', async ({ text }) => {
  const url = routes.lists();
  const response = await axios.post(url, { text });
  console.log('addListThunk response.data -', response.data);
  return response.data.list;
});

export const removeList = createAsyncThunk(
  'lists/removeList',
  async ({ id }) => {
    const url = routes.list(id);
    const response = await axios.delete(url);
    console.log('removeListThunk response -', response);
    return id;
  }
);

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
    [fetchLists.fulfilled]: adapter.setAll,
    [addList.fulfilled]: adapter.addOne,
    [removeList.fulfilled]: adapter.removeOne,
  },
});

const adapterSelectors = adapter.getSelectors((state) => state.lists);
const selectCurrentListId = (state) => state.lists.currentListId;

export const listsSelectors = { ...adapterSelectors, selectCurrentListId };
export const listsThunks = { fetchLists, addList, removeList };

const actions = { ...slice.actions };

export { actions };

export default slice.reducer;
