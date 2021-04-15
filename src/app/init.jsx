import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from '../store/index.js';
import App from './App.jsx';

const init = (preloadedState) => {
  const store = createStore(preloadedState);
  const container = document.getElementById('root');

  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  ReactDOM.render(vdom, container);
};

export default init;
