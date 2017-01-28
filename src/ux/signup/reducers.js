import { combineReducers } from 'redux'

import * as userActions from '../../api/users/actions'
import * as actions from './actions'
import initialState from './state'

import confirm from './confirm/reducers'

const errors = (state = initialState.errors, action) => {
    switch(action.type) {

        case userActions.SIGNUP_FAILURE:
            return {...action.errors}

        case actions.CLEAR_SIGNUP_FORM:
            return {}
        
        default:
            return state
    }
}

const complete = (state = initialState.complete, action) => {
    switch(action.type) {

        case userActions.SIGNUP_SUCCESS:
            return true
        
        case actions.CLEAR_SIGNUP_FORM:
            return false
        
        default:
            return state
    }
}

export default combineReducers({
    errors,
    complete,
    confirm
})