import { combineReducers } from 'redux'

import { AUTH } from 'api/users/auth/actions'
import {
    loading as ldg,
    errors as err } from 'ux/utils'

export const loading = (state = false, action) => {
    return ldg(AUTH, state, action)
}

export const errors = (state = {}, action) => {
    return err(AUTH, state, action)
}

export default combineReducers({
    loading,
    errors
})