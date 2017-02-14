import { combineReducers } from 'redux'

import {
    loading as ldg,
    errors as err} from 'ux/utils'

import { PEOPLE_DOC } from './actions'

const loading = (state = false, action) => {
    return ldg(PEOPLE_DOC, state, action)
}

const errors = (state = {}, action) => {
    return err(PEOPLE_DOC, state, action)
}

export default combineReducers({
    loading,
    errors
})