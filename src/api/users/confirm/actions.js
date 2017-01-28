import fetch from 'isomorphic-fetch'

// TODO: Abstract general endpoint URI
const usersEndpoint = 'http://api.localhost/v0/users/'
const confEndpoint = usersEndpoint + 'conf/'

export const CREATE_CONFIRM_TOKEN_REQUEST = 'CREATE_CONFIRM_TOKEN_REQUEST'
const createConfirmTokenRequest = () => ({ type: CREATE_CONFIRM_TOKEN_REQUEST })

export const CREATE_CONFIRM_TOKEN_SUCCESS = 'CREATE_CONFIRM_TOKEN_SUCCESS'
const createConfirmTokenSuccess = () => ({ type: CREATE_CONFIRM_TOKEN_SUCCESS })

export const CREATE_CONFIRM_TOKEN_FAILURE = 'CREATE_CONFIRM_TOKEN_FAILURE'
const createConfirmTokenFailure = () => ({ type: CREATE_CONFIRM_TOKEN_FAILURE })

export const CONFIRM_ACCOUNT_REQUEST = 'CONFIRM_ACCOUNT_REQUEST'
const confirmAccountRequest = () => ({ type: CONFIRM_ACCOUNT_REQUEST })

export const CONFIRM_ACCOUNT_SUCCESS = 'CONFIRM_ACCOUNT_SUCCESS'
const confirmAccountSuccess = (data) => ({
    type: CONFIRM_ACCOUNT_SUCCESS,
    user: {...data.user}
})

export const CONFIRM_ACCOUNT_FAILURE = 'CONFIRM_ACCOUNT_FAILURE'
const confirmAccountFailure = (error) => ({
    type: CONFIRM_ACCOUNT_FAILURE,
    errors: {...error.detail}
})

export const createConfirmToken = (email) => {
    return (dispatch) => {
        dispatch(createConfirmTokenRequest());
        return fetch(confEndpoint, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ email })
        })
            .then(response => {
                if (response.status === 204) {
                    return dispatch(createConfirmTokenSuccess())
                } else {
                    return dispatch(createConfirmTokenFailure())
                }
            })
    }
}

export const confirmAccount = (key) => {
    return (dispatch) => {
        dispatch(confirmAccountRequest());
        return fetch(confEndpoint, {
            method: 'PUT',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ key })
        })
            .then(response => {
                if (response.status === 200)
                    return response.json()
                        .then(data => dispatch(confirmAccountSuccess(data)))                        
                else
                    return response.json()
                        .then(error => dispatch(confirmAccountFailure(error)))
            })
    }
}
