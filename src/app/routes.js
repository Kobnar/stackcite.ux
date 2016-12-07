import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './App';
import Home from './home'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
    </Route>
);