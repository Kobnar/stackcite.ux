import {
    REQUEST,
    SUCCESS,
    FAILURE,
    createDocument,
    retrieveDocument,
    updateDocument,
    deleteDocument } from '../../actions'

const ROUTE = 'users/auth/'

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

const createAuthTokenSuccess = (data) => ({
    type: POST_AUTH_TOKEN,
    status: SUCCESS,
    ...mapAuthToken(data)
})

const createAuthTokenFailure = (error) => ({
    type: POST_AUTH_TOKEN,
    status: FAILURE,
    errors: AUTH_FAILED_ERROR
})

const retrieveAuthTokenRequest = () => ({
    type: GET_AUTH_TOKEN,
    status: REQUEST
})

const retrieveAuthTokenSuccess = (data) => ({
    type: GET_AUTH_TOKEN,
    status: SUCCESS,
    ...mapAuthToken(data)
})

const retrieveAuthTokenFailure = (error) => ({
    type: GET_AUTH_TOKEN,
    status: FAILURE,
    errors: AUTH_FAILED_ERROR
})

const updateAuthTokenRequest = () => ({
    type: PUT_AUTH_TOKEN,
    status: REQUEST
})

const updateAuthTokenSuccess = (data) => ({
    type: PUT_AUTH_TOKEN,
    status: SUCCESS,
    ...mapAuthToken(data)
})

const updateAuthTokenFailure = (error) => ({
    type: PUT_AUTH_TOKEN,
    status: FAILURE,
    errors: AUTH_FAILED_ERROR
})

const deleteAuthTokenRequest = () => ({
    type: DELETE_AUTH_TOKEN,
    status: REQUEST
})

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
                if (action.status === SUCCESS)
                    return dispatch(createAuthTokenSuccess(action.data))
                else
                    return dispatch(createAuthTokenFailure(action.error))
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