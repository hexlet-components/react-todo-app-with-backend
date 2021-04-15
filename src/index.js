// @ts-check

import 'react-toastify/dist/ReactToastify.css';
import gon from 'gon';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import init from './app/init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'todo-list:*';
}

init(gon);
