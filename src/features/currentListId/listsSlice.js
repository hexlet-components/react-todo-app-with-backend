// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'lists',
  initialState: {
    lists: [],
    currentListId: null,
  },
  reducers: {
    initLists: (state, { payload: { lists } }) => {
      state.lists = [...lists];
    },
    addList: (state, { payload: { list } }) => {
      state.lists.unshift(list);
      state.currentListId = list.id;
    },
    removeList: (state, { payload }) => {
      state.lists = state.lists.filter((list) => list.id !== payload.id);
    },
    selectList: (state, { payload }) => {
      state.currentListId = payload.id;
    },
  },
});

export const { initLists, addList, removeList, selectList } = slice.actions;

export default slice.reducer;
