import api from 'api'

import {
    REQUEST,
    SUCCESS,
    FAILURE } from 'api/actions'

export const CONFIRM_ACCOUNT = 'CONFIRM_ACCOUNT'

export const confirm = (confirmKey) => {
    return (dispatch) => {
        dispatch({
            type: CONFIRM_ACCOUNT,
            status: REQUEST
        })
        return dispatch(api.users.conf.update(confirmKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        type: CONFIRM_ACCOUNT,
                        status: SUCCESS
                    })
                else
                    return dispatch({
                        type: CONFIRM_ACCOUNT,
                        status: FAILURE
                    })
            })
    }
}