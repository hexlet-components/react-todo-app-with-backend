import ReactDOM from 'react-dom';
import init from './app/init.jsx';
import runMock from './api/mock.js';
import * as serviceWorker from './serviceWorker.js';
import createStore from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

if (process.env.NODE_ENV === 'development') {
  runMock();
}

const store = createStore();

const vdom = init(store);
const container = document.getElementById('root');

ReactDOM.render(vdom, container);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
