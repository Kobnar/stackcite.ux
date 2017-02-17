import React from 'react'
import { IndexRoute, Route } from 'react-router'

import Collection from './Collection'
import CreateForm from './CreateForm'
import detail from './detail/routes'

export default (
    <Route path='people'>
        <IndexRoute component={Collection} />
        <Route path='add' component={CreateForm} />

        { detail }
    </Route>
)