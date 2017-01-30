import fetch from 'isomorphic-fetch'

import * as authActions from './auth/actions'

// TODO: Abstract general endpoint URI
const usersEndpoint = 'http://api.localhost/v0/users/'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
const signupRequest = () => ({ type: SIGNUP_REQUEST })

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const signupSuccess = () => ({ type: SIGNUP_SUCCESS })

export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
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

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
const getUserRequest = () => ({ type: GET_USER_REQUEST })

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
const getUserSuccess = (data) => ({
    type: GET_USER_SUCCESS,
    user: data
})

export const GET_USER_FAILURE = 'GET_USER_FAILURE'
const getUserFailure = (error) => ({ type: GET_USER_FAILURE })

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST })

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
const updateUserSuccess = (data) => ({
    type: UPDATE_USER_SUCCESS,
    user: data
})

export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE'
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

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST'
const deleteUserRequest = () => ({ type: DELETE_USER_REQUEST })

export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
const deleteUserSuccess = (data) => ({ type: DELETE_USER_SUCCESS })

export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE'
const deleteUserFailure = (error) => ({ type: DELETE_USER_FAILURE })

export const signup = (email, password) => {
    return (dispatch) => {
        dispatch(signupRequest())
        return fetch(usersEndpoint, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ email, password })
        })
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
        var userEndpoint = usersEndpoint + userId + "/"
        dispatch(getUserRequest())
        return fetch(userEndpoint , {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'key '.concat(tokenKey)
            })
        })
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
        var userEndpoint = usersEndpoint + userId + "/"
        dispatch(updateUserRequest())
        return fetch(userEndpoint, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'key '.concat(tokenKey)
            }),
            body: JSON.stringify(data)
        })
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
        var userEndpoint = usersEndpoint + userId + "/"
        dispatch(getUserRequest())
        return fetch(userEndpoint , {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'key '.concat(tokenKey)
            })
        })
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