import React from 'react';
import { Provider } from 'react-redux';
import adapter from '../store/adapter.js';

import createStore from '../store/index.js';
import App from './App.jsx';

const normalize = (entities) =>
  entities.reduce((acc, task) => ({ ...acc, [task.id]: task }), {});

const init = (preloadedState) => {
  const normalizedStore = {
    currentListId: preloadedState.currentListId,
    tasks: adapter.upsertMany(
      adapter.getInitialState(),
      normalize(preloadedState.tasks)
    ),
    lists: adapter.upsertMany(
      adapter.getInitialState(),
      normalize(preloadedState.lists)
    ),
  };
  const store = createStore(normalizedStore);

  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  return vdom;
};

export default init;
