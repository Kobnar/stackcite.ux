import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import { store, history } from 'init'
import routes from 'ux/routes'

import 'css/glyphicons.css'
import 'css/milligram.css'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('root')
);