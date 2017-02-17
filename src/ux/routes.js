import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from './App'
import { Home } from './home'
// import sources from './sources/routes'
import people from './people/routes'
// import organizations from './organizations/routes'
import { Login } from './login'
import { Signup } from './signup'
import { Account } from './account'

export default (
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>

        {/*{ Sources }*/}
        { people }
        {/*{ Organizations }*/}

        <Route path='login' component={Login}/>
        <Route path='signup' component={Signup}/>

        <Route path='account' component={Account}/>
    </Route>
)