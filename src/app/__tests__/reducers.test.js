import deepFreeze from 'deep-freeze'

import app from '../reducers'
import initialState from '../state'
import * as authActions from '../auth/actions'

describe('app', () => {

    it('child action does not mutate initial state', () => {
        var action = { type: authActions.LOGIN_REQUEST }
        deepFreeze(initialState)
        app(initialState, action)
    })

})