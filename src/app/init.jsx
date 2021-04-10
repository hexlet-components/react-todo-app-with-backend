import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store.js';
import App from './App.jsx';

export default (preloadedState, middleaware) => {
  const store = createStore(preloadedState, middleaware);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
