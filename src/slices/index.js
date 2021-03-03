// @ts-check

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import tasks, { actions as tasksActions } from './tasks.js';
import text, { actions as textActions } from './text.js';

const actions = { tasksActions, textActions };
const reducer = combineReducers({
  tasks,
  text,
});

export { actions };

export default configureStore({
  reducer,
});
