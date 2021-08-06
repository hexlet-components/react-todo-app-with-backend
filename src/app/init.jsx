// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import { setLocale } from 'yup';

import store from '../store/index.js';
import App from './App.jsx';

const init = () => {
  setLocale({
    mixed: {
      required: 'Required!',
      notOneOf: ({ value }) => `${value} already exists`,
    },
    string: {
      min: ({ min }) => `Too small! Min ${min} symbols`,
      max: ({ max }) => `Too long! Max ${max} symbols`,
    },
  });

  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  return vdom;
};

export default init;
