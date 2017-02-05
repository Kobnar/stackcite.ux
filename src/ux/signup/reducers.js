import { combineReducers } from 'redux'

import {
    REQUEST,
    SUCCESS,
    FAILURE } from 'api/actions'

import { 
    loading as formLoading,
    errors as formError,
    success as formSuccess } from 'ux/utils'

import { SIGNUP } from './actions'

import confirm from './confirm/reducers'

export const loading = (state = false, action) => {
    return formLoading(SIGNUP, state, action)
}

export const errors = (state = {}, action) => {
    return formError(SIGNUP, state, action)
}

export const success = (state = false, action) => {
    return formSuccess(SIGNUP, state, action)
}

export default combineReducers({
    confirm,
    loading,
    errors,
    success
})