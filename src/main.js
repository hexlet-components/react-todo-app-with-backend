// @ts-check

import { createRoot } from 'react-dom/client';

import '../assets/application.scss';

import init from './app/init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'todo-list:*';
}

const app = init();

const container = document.getElementById('root');
createRoot(container).render(app);
