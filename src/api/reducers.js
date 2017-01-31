import { combineReducers } from 'redux'
import { normalize, arrayOf } from 'normalizr'

import {
    REQUEST,
    SUCCESS,
    FAILURE,
    POST_DOCUMENT,
    GET_DOCUMENT,
    PUT_DOCUMENT,
    DELETE_DOCUMENT,
    GET_COLLECTION } from './actions'

import initialState from './state'

import orgs from './organizations/reducers'
import users from './users/reducers'

export const updateCache = (cache, update) => {
    var newCache = { ...cache }
    for (var collection in update) {
        newCache[collection] = {
            ...cache[collection],
            ...update[collection] }
    }
    return newCache
}

export const cache = (state = initialState.cache, action) => {
    switch (action.type) {

        case POST_DOCUMENT:
        case GET_DOCUMENT:
        case PUT_DOCUMENT:
            if (action.status === SUCCESS && action.schema) {
                var data = normalize(action.data, action.schema)
                return updateCache(state, data.entities)
            } else
                return state


        case GET_COLLECTION:
            if (action.status === SUCCESS && action.schema) {
                var data = normalize(action.data.items, arrayOf(action.schema))
                return updateCache(state, data.entities)
            } else
                return state

        case DELETE_DOCUMENT:
            // if (action.status === REQUEST)
                // Need to figure out what object to delete (pass through actions)
            return state
        
        default:
            return state
    }
}

export default combineReducers({
    cache,
    orgs,
    users
})