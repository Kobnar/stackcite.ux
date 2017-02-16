import { combineReducers } from 'redux'

import {
    loading as ldg,
    errors as err} from 'ux/utils'

import { PEOPLE } from './actions'

const loading = (state = false, action) => {
    return ldg(PEOPLE, state, action)
}

const errors = (state = {}, action) => {
    return err(PEOPLE, state, action)
}

export default combineReducers({
    loading,
    errors
})