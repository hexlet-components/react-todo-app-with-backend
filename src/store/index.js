import { toast } from 'react-toastify';
import { has } from 'lodash';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import listsReducer from '../features/lists/listsSlice.js';
import tasksReducer from '../features/tasks/tasksSlice.js';

const { reducer: currentListIdReducer } = createSlice({
  name: 'currentListId',
  initialState: null,
  reducers: {
    setCurrentListId: (state, { payload }) => payload.listId,
  },
});

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
      currentListId: currentListIdReducer,
    },
    middleware: (getDefaultMiddleware) => {
      return [...getDefaultMiddleware(), ...customMiddlewares, toastMiddleware];
    },
    preloadedState,
  });

  return store;
};
