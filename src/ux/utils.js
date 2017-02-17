import React from 'react'
import { LOCATION_CHANGE } from 'react-router-redux'

import { REQUEST, SUCCESS, FAILURE } from 'api/actions'

/**
 * Converts an integer date to a propery formatted string value.
 */
export const readDate = (date) => {
    if (date < 0)
        return -date + ' B.C.E.'
    else
        return date
}

/**
 * Clones a copy of a document that only contains truthy values.
 */
export const truthy = (data) => {
    var newData = {}
    Object.entries(data)
        .forEach(([key, value]) => {
            if (value)
                if (typeof value === 'object')
                    newData[key] = truthy(value)
                else
                    newData[key] = value
        })
    return newData
}

/**
 * Copies truthy values from a given object to a new object.
 */
export const getFormData = (data, fields) => {
    var newData = {}
    Object.entries(data).map(([key, value]) => {
        if (value)
            if (fields && fields.includes(key) || !fields)
                newData[key] = value
    })
    return newData
}

/**
 * Filters cached collection object into a list of documents based on a list
 * of desired object ids.
 */
export const filterCollection = (collection, filter) => {
    var filteredCollection = []
    if (collection)
        Object.entries(collection)
            .forEach(([docId, document]) => {
                if (!!filter.length && filter.includes(docId) || !filter.length)
                    filteredCollection.push(document)
            })
    return filteredCollection
}

// Modified from http://davidwalsh.name/javascript-debounce-function
/**
 * A general function debounce method.
 */
export const debounce = (func, wait) => {
	var timeout
	return () => {
		var context = this, args = arguments
		var later = () => {
			timeout = null
			func.apply(context, args)
		}
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
	}
}

/**
 * A generalized reducer for indicating an active request "loading" state to
 * front-end components.
 */
export const loading = (actionType, state, action) => {
    if (action.type === actionType)
        if (action.status === REQUEST)
            return true
        else
            return false

    return state
}

/**
 * A generalized reducer for passing API errors through to front-end components.
 */
export const errors = (actionType, state, action) => {
    if (action.type === actionType)
        if (action.status === FAILURE)
            return {
                request: action.error.code,
                ...action.error.detail
            }
        else
            return {}
    
    else if (action.type === LOCATION_CHANGE)
        return {}

    return { ...state }
}

/**
 * A generalized reducer for indicating a successful API request to front-end
 * components.
 */
export const success = (actionType, state, action) => {
    if (action.type === actionType)
        if (action.status === SUCCESS)
            return true
        else
            return false
    
    else if (action.type === LOCATION_CHANGE)
        return false

    return state
}