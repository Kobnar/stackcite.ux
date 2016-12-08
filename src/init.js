import { combineReducers, createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import app from './app/reducers';

// Combine the root reducer
const rootReducer = combineReducers({
    routing: routerReducer,
    app
})

// Instantiate logger and router middleware
const loggingMiddleware = createLogger()
const routingMiddleware = routerMiddleware(browserHistory)

// Instantiate an application-wide state object
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggingMiddleware,
        routingMiddleware
    )
)

// Sync router browser history with application-wide state object
const history = syncHistoryWithStore(browserHistory, store)

export { store, history };