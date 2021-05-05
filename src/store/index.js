import { configureStore } from '@reduxjs/toolkit';
import listsReducer from '../features/lists/listsSlice.js';
import tasksReducer from '../features/tasks/tasksSlice.js';
import currentListIdReducer from './currentListIdSlice.js';

export default (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      lists: listsReducer,
      tasks: tasksReducer,
      currentListId: currentListIdReducer,
    },
    preloadedState,
  });

  return store;
};
