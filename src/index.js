// System dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

// StackCite local dependencies
import { store, history } from './init.js';
import routes from './app/routes';

// Stylesheets
import './css/skeleton/normalize.css';
import './css/skeleton/skeleton.css';

// Call React render method
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('root')
);