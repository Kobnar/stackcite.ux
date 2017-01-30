import fetch from 'isomorphic-fetch'

import * as apiActions from '../actions'
import * as authActions from './auth/actions'

const route = 'users/'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILURE = 'GET_USER_FAILURE'

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE'

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE'

const signupRequest = () => ({ type: SIGNUP_REQUEST })

const signupSuccess = () => ({ type: SIGNUP_SUCCESS })

const signupFailure = (error) => {
    if (error.code === 409) {
        return {
            type: SIGNUP_FAILURE,
            errors: { email: ['This email address is already registered.'] }
        }
    } else {
        return {
            type: SIGNUP_FAILURE,
            errors: { password: ['This is an invalid password.'] }
        }
    }
}

const getUserRequest = () => ({ type: GET_USER_REQUEST })

const getUserSuccess = (data) => ({
    type: GET_USER_SUCCESS,
    user: data
})

const getUserFailure = (error) => ({ type: GET_USER_FAILURE })

const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST })

const updateUserSuccess = (data) => ({
    type: UPDATE_USER_SUCCESS,
    user: data
})

const updateUserFailure = (error) => {
    if (error.code === 409) {
        return {
            type: UPDATE_USER_FAILURE,
            errors: { email: ['This email address is already registered.'] }
        }
    } else {
        return {
            type: UPDATE_USER_FAILURE,
            errors: {...error.detail}
        }
    }
}

const deleteUserRequest = () => ({ type: DELETE_USER_REQUEST })

const deleteUserSuccess = (data) => ({ type: DELETE_USER_SUCCESS })

const deleteUserFailure = (error) => ({ type: DELETE_USER_FAILURE })

export const signup = (email, password) => {
    return (dispatch) => {
        dispatch(signupRequest())
        return apiActions.createDocument(route, { email, password })
            .then(response => {
                if (response.ok) {
                    return response.json()
                        .then(data => dispatch(signupSuccess(data)))
                } else {
                    return response.json()
                        .then(error => dispatch(signupFailure(error)))
                }
    
            })
    }
}

export const getUser = (tokenKey, userId) => {
    return (dispatch) => {
        dispatch(getUserRequest())
        return apiActions.retrieveDocument(route, userId, tokenKey)
            .then(response => {
                if (response.ok) {
                    return response.json()
                        .then(data => dispatch(getUserSuccess(data)))
                } else {
                    return response.json()
                        .then(error => dispatch(getUserFailure(error)))
                }
            })
    }
}

export const updateUser = (tokenKey, userId, data) => {
    return (dispatch) => {
        dispatch(updateUserRequest())
        return apiActions.updateDocument(route, userId, data, tokenKey)
            .then(response => {
                if (response.ok) {
                    return response.json()
                        .then(data => dispatch(updateUserSuccess(data)))
                } else {
                    return response.json()
                        .then(error => dispatch(updateUserFailure(error)))
                }
            })
    }
}

export const deleteUser = (tokenKey, userId) => {
    return (dispatch) => {
        dispatch(getUserRequest())
        return apiActions.deleteDocument(route, userId, tokenKey)
            .then(response => {
                if (response.ok) {
                    dispatch(deleteUserSuccess())
                    dispatch(authActions.logoutSuccess())
                } else {
                    return dispatch(deleteUserFailure())
                }
            })
    }
}