// @ts-check

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import lists, { actions as listsActions } from './lists.js';
import tasks, { actions as tasksActions } from './tasks.js';
import text, { actions as textActions } from './text.js';
import fetchingStates from './fetchingStates.js';

const actions = { listsActions, tasksActions, textActions };
const reducer = combineReducers({
  lists,
  tasks,
  text,
  fetchingStates,
});

export { actions };

export default configureStore({
  reducer,
});
