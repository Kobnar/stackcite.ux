import { combineReducers } from 'redux'

import initialState from './state'
import * as actions from './actions'

const loading = (state = initialState.loading, action) => {
    switch(action.type) {

        case actions.LOGIN_REQUEST:
        case actions.LOGOUT_REQUEST:
        case actions.TOUCH_TOKEN_REQUEST:
            return true

        case actions.LOGIN_SUCCESS:
        case actions.LOGIN_FAILURE:
        case actions.LOGOUT_SUCCESS:
        case actions.LOGOUT_FAILURE:
        case actions.TOUCH_TOKEN_SUCCESS:
        case actions.TOUCH_TOKEN_FAILURE:
            return false

        default:
            return state
    }
}

const user = (state = initialState.user, action) => {
    switch(action.type) {

        case actions.LOGIN_SUCCESS:
        case actions.TOUCH_TOKEN_SUCCESS:
            return { 
                ...state,
                ...action.user
            }

        case actions.LOGIN_FAILURE:
        case actions.LOGOUT_SUCCESS:
        case actions.LOGOUT_FAILURE:
        case actions.TOUCH_TOKEN_FAILURE:
            return initialState.user

        default:
            return state
    }
}

const token = (state = initialState.token, action) => {
    switch(action.type) {

        case actions.LOGIN_SUCCESS:
        case actions.TOUCH_TOKEN_SUCCESS:
            return {
                ...state,
                ...action.token
            }

        case actions.LOGIN_FAILURE:
        case actions.LOGOUT_SUCCESS:
        case actions.LOGOUT_FAILURE:
        case actions.TOUCH_TOKEN_FAILURE:
            return initialState.token

        default:
            return state
    }
}

export default combineReducers({
    loading,
    user,
    token
})