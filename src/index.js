// @ts-check

import ReactDOM from 'react-dom';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import init from './app/init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'todo-list:*';
}

const app = init();

const container = document.getElementById('root');
ReactDOM.render(app, container);
