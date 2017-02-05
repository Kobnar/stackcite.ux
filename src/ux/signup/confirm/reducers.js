import { combineReducers } from 'redux'

import {
    loading as formLoading,
    success as formSuccess } from 'ux/utils'
import { CONFIRM_ACCOUNT } from './actions'

const loading = (state = false, action) => {
    return formLoading(CONFIRM_ACCOUNT, state, action)
}

const success = (state = false, action) => {
    return formSuccess(CONFIRM_ACCOUNT, state, action)
}

export default combineReducers({
    loading,
    success
})