import {
    REQUEST,
    SUCCESS,
    FAILURE,
    createDocument,
    retrieveDocument,
    updateDocument,
    deleteDocument } from '../actions'

import * as authActions from './auth/actions'

const ROUTE = 'users/'

export const POST_USER = 'POST_USER'
export const GET_USER = 'GET_USER'
export const PUT_USER = 'PUT_USER'
export const DELETE_USER = 'DELETE_USER'
export const GET_USERS = 'GET_USERS'

const createUserRequest = () => ({
    type: POST_USER,
    status: REQUEST
})

const createUserSuccess = (data) => ({
    type: POST_USER,
    status: SUCCESS,
    data
})

const createUserFailure = (error) => {
    var action = {
        type: POST_USER,
        status: FAILURE,
        errors: error.detail
    }
    if (error.code === 409)
        action.errors["email"] = ['This email is already registered.']
    return action
}

const retrieveUserRequest = (userId) => ({
    type: GET_USER,
    status: REQUEST,
    userId
})

const retrieveUserSuccess = (userId, data) => ({
    type: GET_USER,
    status: SUCCESS,
    user: data,
    userId
})

const retrieveUserFailure = (userId, error) => ({
    type: GET_USER,
    status: FAILURE,
    errors: error.detail,
    userId
})

const updateUserRequest = (userId) => ({
    type: PUT_USER,
    status: REQUEST,
    userId
})

const updateUserSuccess = (userId, data) => ({
    type: PUT_USER,
    status: SUCCESS,
    user: data,
    userId
})

const updateUserFailure = (userId, error) => ({
    type: PUT_USER,
    status: FAILURE,
    errors: error.detail,
    userId
})

const deleteUserRequest = (userId) => ({
    type: DELETE_USER,
    status: REQUEST,
    userId
})

const deleteUserSuccess = (userId) => ({
    type: DELETE_USER,
    status: SUCCESS,
    userId
})

const deleteUserFailure = (userId) => ({
    type: DELETE_USER,
    status: FAILURE,
    userId
})

const retrieveCollectionRequest = (route) => ({
    type: GET_USERS,
    status: REQUEST,
})

const retrieveCollectionSuccess = (data) => ({
    type: GET_USERS,
    status: SUCCESS,
    users: data
})

const retrieveCollectionFailure = (error) => ({
    type: GET_USERS,
    status: FAILURE,
    errors: error.detail
})

export const createUser = (email, password) => {
    return (dispatch) => {
        dispatch(createUserRequest())
        return dispatch(createDocument(ROUTE, { email, password }))
            .then(action => {
                if (action.status === SUCCESS)
                    dispatch(createUserSuccess(action.data))
                else
                    dispatch(createUserFailure(action.error))
            })
    }
}

export const retrieveUser = (tokenKey, userId) => {
    return (dispatch) => {
        dispatch(retrieveUserRequest())
        return dispatch(retrieveDocument(ROUTE, userId, tokenKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch(retrieveUserSuccess(userId, action.data))
                else
                    return dispatch(retrieveUserFailure(userId, action.error))
            })
    }
}

export const updateUser = (tokenKey, userId, data) => {
    return (dispatch) => {
        dispatch(updateUserRequest())
        return dispatch(updateDocument(ROUTE, userId, data, tokenKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch(updateUserSuccess(userId, action.data))
                else
                    return dispatch(updateUserFailure(userId, action.error))
            })
    }
}

export const deleteUser = (tokenKey, userId) => {
    return (dispatch) => {
        dispatch(deleteUserRequest())
        return dispatch(deleteDocument(ROUTE, userId, tokenKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch(deleteUserSuccess(userId))
                else
                    return dispatch(deleteUserFailure(userId))
            })
    }
}