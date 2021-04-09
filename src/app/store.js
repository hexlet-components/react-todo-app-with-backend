import { configureStore } from '@reduxjs/toolkit';
import listsReducer from '../features/currentListId/listsSlice.js';
import tasksReducer from '../features/tasks/tasksSlice.js';
import textReducer from '../features/taskForm/textSlice.js';

export default (preloadedState = {}, middleaware = () => {}) => {
  const store = configureStore({
    reducer: {
      lists: listsReducer,
      tasks: tasksReducer,
      text: textReducer, // Потом это замениться Formik
    },
    middleaware,
    preloadedState,
  });

  return store;
};
