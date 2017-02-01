import { combineReducers } from 'redux'

import initialState from './state'
import * as actions from './actions'

const loading = (state = initialState.loading, action) => {
    switch(action.type) {
        
        case actions.SIGNUP_REQUEST:
        case actions.GET_USER_REQUEST:
        case actions.UPDATE_USER_REQUEST:
        case actions.DELETE_USER_REQUEST:
            return true
        
        case actions.SIGNUP_SUCCESS:
        case actions.SIGNUP_FAILURE:
        case actions.GET_USER_SUCCESS:
        case actions.GET_USER_FAILURE:
        case actions.UPDATE_USER_SUCCESS:
        case actions.UPDATE_USER_FAILURE:
        case actions.DELETE_USER_SUCCESS:
        case actions.DELETE_USER_FAILURE:
            return false

        default:
            return state
    }
}

export default combineReducers({
    loading,
    auth,
    confirm
})