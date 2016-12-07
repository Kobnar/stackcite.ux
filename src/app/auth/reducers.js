import { combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

import * as actions from './actions';

const initialState = {
    loading: false,
    user: {
        id: ''
    },
    token: {
        key: '',
        issued: null,
        touched: null
    }
}

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
            return initialState.loading

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
                id: action.user.id
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
                key: action.token.key,
                issued: action.token.issued,
                touched: action.token.touched
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