import {
    REQUEST,
    SUCCESS,
    FAILURE,
    createDocument,
    updateDocument } from '../../actions'

const ROUTE = 'users/conf/'

export const POST_CONFIRM_TOKEN = 'POST_CONFIRM_TOKEN'
export const PUT_CONFIRM_TOKEN = 'PUT_CONFIRM_TOKEN'

const createConfirmTokenRequest = () => ({
    type: POST_CONFIRM_TOKEN,
    status: REQUEST
})

const createConfirmTokenSuccess = () => ({
    type: POST_CONFIRM_TOKEN,
    status: SUCCESS
})

const createConfirmTokenFailure = () => ({
    type: POST_CONFIRM_TOKEN,
    status: FAILURE
})

const updateConfirmTokenRequest = () => ({
    type: PUT_CONFIRM_TOKEN,
    status: REQUEST
})

const updateConfirmTokenSuccess = () => ({
    type: PUT_CONFIRM_TOKEN,
    status: SUCCESS
})

const updateConfirmTokenFailure = () => ({
    type: PUT_CONFIRM_TOKEN,
    status: FAILURE
})

export const createConfirmToken = (email) => {
    return (dispatch) => {
        dispatch(createConfirmTokenRequest())
        return dispatch(createDocument(ROUTE, { email }))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch(createConfirmTokenSuccess())
                else
                    return dispatch(createConfirmTokenFailure())
            })
    }
}

export const updateConfirmToken = (key) => {
    return (dispatch) => {
        dispatch(updateConfirmTokenRequest())
        return dispatch(updateDocument(ROUTE, undefined, { key }))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch(updateConfirmTokenSuccess())
                else
                    return dispatch(updateConfirmTokenFailure())
            })
    }
}