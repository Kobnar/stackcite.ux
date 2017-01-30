import { combineReducers } from 'redux'

import { REQUEST, SUCCESS } from '../../actions'
import {
    POST_AUTH_TOKEN,
    GET_AUTH_TOKEN,
    PUT_AUTH_TOKEN,
    DELETE_AUTH_TOKEN } from './actions'
import {
    DELETE_USER } from '../actions'

import initialState from './state'

const loading = (state = initialState.loading, action) => {
    switch (action.type) {

        case POST_AUTH_TOKEN:
        case GET_AUTH_TOKEN:
        case PUT_AUTH_TOKEN:
        case DELETE_AUTH_TOKEN:
            if (action.status === REQUEST)
                return true
            else
                return initialState.loading
        
        default:
            return state
    }
}

const user = (state = initialState.user, action) => {
    switch (action.type) {

        case POST_AUTH_TOKEN:
        case GET_AUTH_TOKEN:
        case PUT_AUTH_TOKEN:
            if (action.status === SUCCESS)
                return { ...action.user }
            else
                return initialState.user
        
        case DELETE_AUTH_TOKEN:
        case DELETE_USER:
            return initialState.user

        default:
            return state
    }
}

const token = (state = initialState.token, action) => {
    switch (action.type) {

        case POST_AUTH_TOKEN:
        case GET_AUTH_TOKEN:
        case PUT_AUTH_TOKEN:
            if (action.status === SUCCESS)
                return { ...action.token }
            else
                return initialState.token
        
        case DELETE_AUTH_TOKEN:
        case DELETE_USER:
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