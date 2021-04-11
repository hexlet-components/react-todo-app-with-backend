import { configureStore } from '@reduxjs/toolkit';
import listsReducer from '../features/lists/listsSlice.js';
import tasksReducer from '../features/tasks/tasksSlice.js';

export default (preloadedState = {}, customMiddlewares = []) => {
  const store = configureStore({
    reducer: {
      lists: listsReducer,
      tasks: tasksReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(customMiddlewares),
    preloadedState,
  });

  return store;
};
