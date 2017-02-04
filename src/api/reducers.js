import { combineReducers } from 'redux'
import { normalize, arrayOf } from 'normalizr'

import { REST_API, SUCCESS, DELETE } from './actions'

import auth from './users/auth/reducers'

export const mergeCache = (cache, update) => {
    // HACK: Need a better deep-clone method
    var newCache = JSON.parse(JSON.stringify(cache))
    for (var collection in update) {
        newCache[collection] = {
            ...newCache[collection],
            ...update[collection] }
    }
    return newCache
}

export const deleteDocument = (cache, documentId) => {
    // HACK: Need a better deep-clone method
    var newCache = JSON.parse(JSON.stringify(cache))
    for (var collection in newCache)
        var cachedCollection = newCache[collection]
        if (documentId in cachedCollection)
            delete cachedCollection[documentId]
    return newCache
}

export const cache = (state = {}, action) => {
    if (action.type === REST_API && action.status === SUCCESS)
        if (action.schema) {
            if (action.method === DELETE) {
                return deleteDocument(state, action.documentId)
            } else {
                var data = {}
                if (action.data.items)
                    data = normalize(action.data.items, arrayOf(action.schema))
                else
                    data = normalize(action.data, action.schema)
                return mergeCache(state, data.entities)
            }
        }
    return state
}

export default combineReducers({
    auth,
    cache
})