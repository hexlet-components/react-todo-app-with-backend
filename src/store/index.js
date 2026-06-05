// @ts-check

import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api.js';
// import listsReducer from '../features/lists/listsSlice.js';
// import tasksReducer from '../features/tasks/tasksSlice.js';
import currentListIdReducer from './currentListIdSlice.js';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    currentListId: currentListIdReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
