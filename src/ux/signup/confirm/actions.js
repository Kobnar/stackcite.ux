import { push } from 'react-router-redux'

import * as actions from '../../../api/users/confirm/actions'

export const CLEAR_CONFIRM_ERRORS = 'CLEAR_CONFIRM_ERRORS'
export const clearConfirmErrors = () => ({ type: CLEAR_CONFIRM_ERRORS })

export const confirmAccount = (key, redirectTarget) => {
    return (dispatch) => {
        dispatch(actions.confirmAccount(key))
            .then(action => {
                if (action.type === actions.CONFIRM_ACCOUNT_SUCCESS)
                    dispatch(push(redirectTarget))
                })
    }
}