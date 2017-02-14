import { combineReducers } from 'redux'

import {
    loading as ldg,
    errors as err} from 'ux/utils'

import detail from './detail/reducers'

import { PEOPLE_COL } from './actions'

const loading = (state = false, action) => {
    return ldg(PEOPLE_COL, state, action)
}

const errors = (state = {}, action) => {
    return err(PEOPLE_COL, state, action)
}

export default combineReducers({
    loading,
    errors,
    detail
})