import { combineReducers } from 'redux'

import initialState from './state'

import { FAILURE } from '../../api/actions'
import { POST_ORG } from '../../api/organizations/actions'

export const errors = (state = initialState.errors, action) => {
    switch (action.type) {
        case POST_ORG:
            if (action.status === FAILURE)
                return action.errors
            else
                return initialState.errors
        
        default:
            return state
    }
}

export default combineReducers({
    errors
})