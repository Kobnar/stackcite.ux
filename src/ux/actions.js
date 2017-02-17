import { REQUEST, SUCCESS, FAILURE } from 'api/actions'

import {
    saveCookie,
    loadCookie,
    removeCookie,
    touchLogin } from './login/actions'

export const INIT = 'INIT'
export const HIDE_NAV = 'HIDE_NAV'
export const TOGGLE_NAV = 'TOGGLE_NAV'

export const init = () => {
    return (dispatch) => {
        dispatch({
            type: INIT,
            status: REQUEST
        })
        var authKey = loadCookie()
        if (authKey)
            dispatch(touchLogin(authKey))
                .then(action => {
                    if (action.status === SUCCESS) {
                        dispatch({
                            type: INIT,
                            status: SUCCESS
                        })
                    } else {
                        dispatch({
                            type: INIT,
                            status: FAILURE
                        })
                    }
                })
        else
            dispatch({
                type: INIT,
                status: SUCCESS
            })
    }
}

export const hideNav = () => ({
    type: HIDE_NAV
})

export const toggleNav = () => ({
    type: TOGGLE_NAV
})