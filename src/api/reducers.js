import { combineReducers } from 'redux'
import { normalize, arrayOf } from 'normalizr'

import { STACKCITE_API, COLLECTION, SUCCESS, DELETE } from './actions'
import { clone, updateCache, deleteDocument } from './utils'

import auth from './users/auth/reducers'

export const cache = (state = {}, action) => {
    // TODO: Entirely separate cache update actions
    if (action.type === STACKCITE_API && action.status === SUCCESS) {
        if (action.schema) {
            if (action.method === DELETE) {
                return deleteDocument(state, action.documentId)
            } else {
                var data = {}
                if (action.data.items)
                    data = normalize(action.data.items, arrayOf(action.schema))
                else
                    data = normalize(action.data, action.schema)
                return updateCache(state, data.entities)
            }
        }
    }
    return state
}

export default combineReducers({
    auth,
    cache
})