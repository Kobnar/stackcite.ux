import { LOCATION_CHANGE } from 'react-router-redux'

import { REQUEST, SUCCESS, FAILURE } from 'api/actions'

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