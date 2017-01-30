import { combineReducers } from 'redux'

import { SUCCESS, FAILURE } from '../../api/actions'
import { POST_AUTH_TOKEN } from '../../api/users/auth/actions'

import * as actions from './actions'
import initialState from './state'

const errors = (state = initialState.errors, action) => {
    switch (action.type) {

        case POST_AUTH_TOKEN:
            if (action.status == SUCCESS)
                return initialState.errors
            else
                return { ...action.errors }

        default:
            return state
    }
}

export default combineReducers({
    errors
})