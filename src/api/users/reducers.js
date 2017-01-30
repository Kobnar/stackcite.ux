import { combineReducers } from 'redux'

import { REQUEST } from '../actions'
import {
    POST_USER,
    GET_USER,
    PUT_USER,
    DELETE_USER,
    GET_USERS } from './actions'

import initialState from './state'

import auth from './auth/reducers'
import confirm from './confirm/reducers'

const loading = (state = initialState.loading, action) => {
    switch(action.type) {

        case POST_USER:
        case GET_USER:
        case PUT_USER:
        case DELETE_USER:
        case GET_USERS:
            if (action.status === REQUEST)
                return true
            else
                return initialState.loading

        default:
            return state
    }
}

export default combineReducers({
    loading,
    auth,
    confirm
})