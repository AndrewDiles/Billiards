import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

// import { SettingsProvider } from './SettingsContext';

// import './index.css';
import App from './Components/App';
// import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      {/* <SettingsProvider> */}
        <App />
      {/* </SettingsProvider> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// serviceWorker.unregister();