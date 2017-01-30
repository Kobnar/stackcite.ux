import fetch from 'isomorphic-fetch'

import * as apiActions from '../../actions'

const route = 'users/conf/'

export const CREATE_CONFIRM_TOKEN_REQUEST = 'CREATE_CONFIRM_TOKEN_REQUEST'
export const CREATE_CONFIRM_TOKEN_SUCCESS = 'CREATE_CONFIRM_TOKEN_SUCCESS'
export const CREATE_CONFIRM_TOKEN_FAILURE = 'CREATE_CONFIRM_TOKEN_FAILURE'

export const CONFIRM_ACCOUNT_REQUEST = 'CONFIRM_ACCOUNT_REQUEST'
export const CONFIRM_ACCOUNT_SUCCESS = 'CONFIRM_ACCOUNT_SUCCESS'
export const CONFIRM_ACCOUNT_FAILURE = 'CONFIRM_ACCOUNT_FAILURE'

const createConfirmTokenRequest = () => ({ type: CREATE_CONFIRM_TOKEN_REQUEST })

const createConfirmTokenSuccess = () => ({ type: CREATE_CONFIRM_TOKEN_SUCCESS })

const createConfirmTokenFailure = () => ({ type: CREATE_CONFIRM_TOKEN_FAILURE })

const confirmAccountRequest = () => ({ type: CONFIRM_ACCOUNT_REQUEST })

const confirmAccountSuccess = (data) => ({
    type: CONFIRM_ACCOUNT_SUCCESS,
    user: {...data.user}
})

const confirmAccountFailure = (error) => ({
    type: CONFIRM_ACCOUNT_FAILURE,
    errors: {...error.detail}
})

export const createConfirmToken = (email) => {
    return (dispatch) => {
        dispatch(createConfirmTokenRequest());
        return apiActions.createDocument(route, { email })
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
        return apiActions.updateDocument(route, undefined, { key })
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
