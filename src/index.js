import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/main.css'
import './assets/styles/loader.css'
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
