import { combineReducers } from 'redux'
import { normalize, arrayOf } from 'normalizr'

import {
    SUCCESS,
    POST_DOCUMENT,
    GET_DOCUMENT,
    PUT_DOCUMENT,
    DELETE_DOCUMENT,
    GET_COLLECTION } from './actions'

import initialState from './state'

import orgs from './organizations/reducers'
import users from './users/reducers'

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

export const cache = (state = initialState.cache, action) => {
    switch (action.type) {

        case POST_DOCUMENT:
        case GET_DOCUMENT:
        case PUT_DOCUMENT:
            if (action.status === SUCCESS && action.schema) {
                var data = normalize(action.data, action.schema)
                return mergeCache(state, data.entities)
            } else
                return state


        case GET_COLLECTION:
            if (action.status === SUCCESS && action.schema) {
                var data = normalize(action.data.items, arrayOf(action.schema))
                return mergeCache(state, data.entities)
            } else
                return state

        case DELETE_DOCUMENT:
            if (action.status === SUCCESS) {
                return deleteDocument(state, action.documentId)
            } else
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