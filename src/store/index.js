import { configureStore } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { has } from 'lodash';
import listsReducer from '../features/lists/listsSlice.js';
import tasksReducer from '../features/tasks/tasksSlice.js';

export default (preloadedState = {}, customMiddlewares = []) => {
  const toastMiddleware = () => (next) => (action) => {
    if (has(action, 'error')) {
      console.dir(action.error);
      toast.error(action.error?.message || 'Неизвестная ошибка');
    }

    return next(action);
  };

  const store = configureStore({
    reducer: {
      lists: listsReducer,
      tasks: tasksReducer,
    },
    middleware: (getDefaultMiddleware) => {
      return [...getDefaultMiddleware(), ...customMiddlewares, toastMiddleware];
    },
    preloadedState,
  });

  return store;
};
