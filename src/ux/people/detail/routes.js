import React from 'react'
import { IndexRoute, Route } from 'react-router'

import Detail from './Detail'
import UpdateForm from './UpdateForm'

export default (
    <Route path=':id'>
        <IndexRoute component={Detail} />
        <Route path='edit' component={UpdateForm} />
    </Route>
)