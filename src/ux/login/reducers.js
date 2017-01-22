import { combineReducers } from 'redux'

import actions from '../../api/users/auth/actions'

import initialState from './state'

const loading = (state = false, action) => {
    switch(action.type) {

        case actions.LOGIN_REQUEST:
            return true

        case actions.LOGIN_SUCCESS:
        case actions.LOGIN_FAILURE:
            return false

        default:
            return state
    }
}

const errors = (state = {}, action) => {
    switch(action.type) {

        case actions.LOGIN_SUCCESS:
            return {}

        case actions.LOGIN_FAILURE:
            return {
                ...action.errors
            }
        
        default:
            return state
    }
}

export default combineReducers({
    loading,
    errors
})