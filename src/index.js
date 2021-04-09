// import gon from 'gon'; // если понадобиться прокинуть preloadedState в createStore
import ReactDOM from 'react-dom';
import init from './app/init.jsx';
import runServer from './common/server.js';
import * as serviceWorker from './common/serviceWorker.js';
import 'bootstrap/dist/css/bootstrap.min.css';

runServer();

/* init() принимает не обязательные аргументы:
preloadedState
middleaware */
const vdom = init();
const container = document.getElementById('root');

ReactDOM.render(vdom, container);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
