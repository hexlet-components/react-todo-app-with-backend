// @ts-check

import { configureStore } from '@reduxjs/toolkit';

// import listsReducer from '../features/lists/listsSlice.js';
// import tasksReducer from '../features/tasks/tasksSlice.js';
import currentListIdReducer from './currentListIdSlice.js';

import { api } from '../services/api.js';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    currentListId: currentListIdReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
