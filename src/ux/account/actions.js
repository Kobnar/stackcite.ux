import api from 'api'
import {
    GET,
    PUT,
    DELETE,
    REQUEST,
    SUCCESS,
    FAILURE } from 'api/actions'

import { logout } from 'ux/login/actions'

export const ACCOUNT = 'ACCOUNT'

export const retrieveUser = (userId, authKey) => {
    return (dispatch) => {
        dispatch({
            type: ACCOUNT,
            method: GET,
            status: REQUEST
        })
        return dispatch(api.users.document(userId).retrieve({}, authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        type: ACCOUNT,
                        method: GET,
                        status: SUCCESS,
                        data: action.data
                    })
                else
                    return dispatch({
                        type: ACCOUNT,
                        method: GET,
                        status: FAILURE,
                        error: action.error
                    })
            })
    }
}

export const updateUser = (data, userId, authKey) => {
    return (dispatch) => {
        dispatch({
            type: ACCOUNT,
            method: PUT,
            status: REQUEST
        })
        return dispatch(api.users.document(userId).update(data, authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        type: ACCOUNT,
                        method: PUT,
                        status: SUCCESS,
                        data: action.data
                    })
                else
                    return dispatch({
                        type: ACCOUNT,
                        method: PUT,
                        status: FAILURE,
                        error: action.error
                    })
            })
    }
}

export const deleteUser = (userId, authKey) => {
    return (dispatch) => {
        dispatch({
            type: ACCOUNT,
            method: DELETE,
            status: REQUEST
        })
        return dispatch(api.users.document(userId).delete(authKey))
            .then(action => {
                if (action.status === SUCCESS) {
                    return dispatch({
                        type: ACCOUNT,
                        method: DELETE,
                        status: SUCCESS
                    })
                } else {
                    return dispatch({
                        type: ACCOUNT,
                        method: DELETE,
                        status: FAILURE,
                        error: action.error
                    })
                }
            })
    }
}