import { push } from 'react-router-redux'

import { SUCCESS } from '../../../api/actions'
import * as actions from '../../../api/users/confirm/actions'

export const CLEAR_CONFIRM_ERRORS = 'CLEAR_CONFIRM_ERRORS'
export const clearConfirmErrors = () => ({ type: CLEAR_CONFIRM_ERRORS })

export const confirmAccount = (key, redirectTarget) => {
    return (dispatch) => {
        dispatch(actions.updateConfirmToken(key))
            .then(action => {
                if (action.status === SUCCESS)
                    dispatch(push(redirectTarget))
                })
    }
}