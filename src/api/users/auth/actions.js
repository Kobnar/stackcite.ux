import * as cookie from 'react-cookie'

import {
    REQUEST,
    SUCCESS,
    FAILURE,
    createDocument,
    retrieveDocument,
    updateDocument,
    deleteDocument } from '../../actions'

export const ROUTE = 'users/auth/'
export const COOKIE_NAME = 'key'

export const POST_AUTH_TOKEN = 'POST_AUTH_TOKEN'
export const GET_AUTH_TOKEN = 'GET_AUTH_TOKEN'
export const PUT_AUTH_TOKEN = 'PUT_AUTH_TOKEN'
export const DELETE_AUTH_TOKEN = 'DELETE_AUTH_TOKEN'

const AUTH_FAILED_ERROR = { auth: ['Authentication failed.'] }

const mapAuthToken = (data) => ({
    user: {
        id: data.user.id
    },
    token: {
        key: data.key,
        issued: data.issued,
        touched: data.touched
    }
})

const createAuthTokenRequest = () => ({
    type: POST_AUTH_TOKEN,
    status: REQUEST
})

const createAuthTokenSuccess = (data) => {
    cookie.save(COOKIE_NAME, data.key)
    return {
        type: POST_AUTH_TOKEN,
        status: SUCCESS,
        ...mapAuthToken(data)
    }
}

const createAuthTokenFailure = (error) => ({
    type: POST_AUTH_TOKEN,
    status: FAILURE,
    errors: AUTH_FAILED_ERROR
})

const retrieveAuthTokenRequest = () => ({
    type: GET_AUTH_TOKEN,
    status: REQUEST
})

const retrieveAuthTokenSuccess = (data) => {
    cookie.save(COOKIE_NAME, data.key)
    return {
        type: GET_AUTH_TOKEN,
        status: SUCCESS,
        ...mapAuthToken(data)
    }
}

const retrieveAuthTokenFailure = (error) => ({
    type: GET_AUTH_TOKEN,
    status: FAILURE,
    errors: AUTH_FAILED_ERROR
})

const updateAuthTokenRequest = () => ({
    type: PUT_AUTH_TOKEN,
    status: REQUEST
})

const updateAuthTokenSuccess = (data) => {
    cookie.save(COOKIE_NAME, data.key)
    return {
        type: PUT_AUTH_TOKEN,
        status: SUCCESS,
        ...mapAuthToken(data)
    }
}

const updateAuthTokenFailure = (error) => ({
    type: PUT_AUTH_TOKEN,
    status: FAILURE,
    errors: AUTH_FAILED_ERROR
})

const deleteAuthTokenRequest = () => {
    cookie.remove(COOKIE_NAME)
    return {
        type: DELETE_AUTH_TOKEN,
        status: REQUEST
    }
}

const deleteAuthTokenSuccess = (data) => ({
    type: DELETE_AUTH_TOKEN,
    status: SUCCESS,
    ...mapAuthToken(data)
})

const deleteAuthTokenFailure = (error) => ({
    type: DELETE_AUTH_TOKEN,
    status: FAILURE,
    errors: AUTH_FAILED_ERROR
})


export const createAuthToken = (email, password) => {
    return (dispatch) => {
        dispatch(createAuthTokenRequest())
        return dispatch(createDocument(ROUTE, { email, password }))
            .then(action => {
                if (action.status === SUCCESS) {
                    return dispatch(createAuthTokenSuccess(action.data))
                }
                else
                    return dispatch(createAuthTokenFailure(action.error))
            })
    }
}

export const retrieveAuthToken = (apiToken) => {
    return (dispatch) => {
        dispatch(retrieveAuthTokenRequest())
        return dispatch(updateDocument(ROUTE, undefined, undefined, apiToken))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch(retrieveAuthTokenSuccess(action.data))
                else
                    return dispatch(retrieveAuthTokenFailure(action.error))
            })
    }
}

export const updateAuthToken = (apiToken) => {
    return (dispatch) => {
        dispatch(updateAuthTokenRequest())
        return dispatch(updateDocument(ROUTE, undefined, undefined, apiToken))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch(updateAuthTokenSuccess(action.data))
                else
                    return dispatch(updateAuthTokenFailure(action.error))
            })
    }
}

export const deleteAuthToken = (apiToken) => {
    return (dispatch) => {
        dispatch(deleteAuthTokenRequest())
        return dispatch(deleteDocument(ROUTE, undefined, undefined, apiToken))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch(deleteAuthTokenSuccess(action.data))
                else
                    return dispatch(deleteAuthTokenFailure(action.error))
            })
    }
}