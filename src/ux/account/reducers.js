import { combineReducers } from 'redux'

import { SUCCESS } from '../../api/actions'
import {
    loading as formLoading,
    errors as formErrors } from '../utils'
import { ACCOUNT } from './actions'

export const user = (state = {}, action) => {
    if (action.type === ACCOUNT)
        if (action.status === SUCCESS)
            return { ...action.data }
        else
            return {}
    return { ...state }
}

export const loading = (state = false, action) => {
    return formLoading(ACCOUNT, state, action)
}

export const errors = (state = {}, action) => {
    return formErrors(ACCOUNT, state, action)
}

export default combineReducers({
    user,
    loading,
    errors
})