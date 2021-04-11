import { Provider } from 'react-redux';
import App from './App.jsx';
import LoggerContext from '../contexts/LoggerContext';

const init = (store, loggerContextValue = { error: console.error }) => {
  return (
    <LoggerContext.Provider value={loggerContextValue}>
      <Provider store={store}>
        <App />
      </Provider>
    </LoggerContext.Provider>
  );
};

export default init;
