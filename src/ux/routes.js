import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from './App'
import { Home } from './home'
import { Sources }from './sources'
import * as people from './people'
// import * as organizations from './organizations'
import { Login } from './login'
import { Signup } from './signup'
import { Account } from './account'

export default (
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>

        <Route path='sources(/:id)' component={Sources}/>

        <Route path='people'>
            <IndexRoute component={people.Collection} />
            <Route path=':id' component={people.Detail} />
        </Route>
        
        {/**
        <Route path='organizations(/:id)' component={organizations.Organizations}/>
        */}

        <Route path='login' component={Login}/>
        <Route path='signup' component={Signup}/>

        <Route path='account' component={Account}/>
    </Route>
)