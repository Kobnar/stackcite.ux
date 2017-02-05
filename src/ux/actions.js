import { REQUEST, SUCCESS, FAILURE } from 'api/actions'

import {
    saveCookie,
    loadCookie,
    removeCookie,
    touchLogin } from './login/actions'

export const INIT = 'INIT'

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
                        saveCookie(authKey)
                        dispatch({
                            type: INIT,
                            status: SUCCESS
                        })
                    } else {
                        removeCookie()
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