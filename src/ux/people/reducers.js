import { combineReducers } from 'redux'

import {
    GET,
    SUCCESS } from 'api/actions'
import { PEOPLE } from './actions'
import {
    loading as ldg,
    errors as err} from 'ux/utils'

import detail from './detail/reducers'

const loading = (state = false, action) => {
    return ldg(PEOPLE, state, action)
}

const errors = (state = {}, action) => {
    return err(PEOPLE, state, action)
}

export const ids = (state = [], action) => {
    if (action.type === PEOPLE && action.status === SUCCESS) {
        if (action.method === GET && action.data.items) {
            var ids = []
            action.data.items.map(person => ids.push(person.id))
            return ids
        } else {
            return []
        }
    }
    return state
}

export default combineReducers({
    loading,
    errors,
    ids,
    detail
})