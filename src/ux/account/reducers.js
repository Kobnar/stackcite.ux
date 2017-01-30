import { combineReducers } from 'redux'

import { SUCCESS } from '../../api/actions'
import {
    GET_USER,
    PUT_USER,
    DELETE_USER } from '../../api/users/actions'
import {
    DELETE_AUTH_TOKEN } from '../../api/users/auth/actions'

import initialState from './state'

const user = (state = initialState.user, action) => {
    switch(action.type) {

        case GET_USER:
        case PUT_USER:
            if (action.status === SUCCESS)
                return { ...action.user }
            else
                return initialState.user

        case DELETE_USER:
        case DELETE_AUTH_TOKEN:
            return initialState.user

        default:
            return state
    }
}

const errors = (state = initialState.errors, action) => {
    switch(action.type) {

        case PUT_USER:
            if (action.status === SUCCESS)
                return initialState.errors
            else
                return { ...action.errors }
        
        default:
            return state
    }
}

export default combineReducers({
    user,
    errors
})