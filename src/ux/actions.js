import { REQUEST, SUCCESS, FAILURE } from 'api/actions'

import * as auth from './auth/actions'

export const INIT = 'INIT'

export const init = () => {
    return (dispatch) => {
        dispatch({
            type: INIT,
            status: REQUEST
        })
        var authKey = auth.loadCookie()
        if (authKey)
            dispatch(auth.touchLogin(authKey))
                .then(action => {
                    if (action.status === SUCCESS) {
                        auth.saveCookie(authKey)
                        dispatch({
                            type: INIT,
                            status: SUCCESS
                        })
                    } else {
                        auth.removeCookie()
                        dispatch({
                            type: INIT,
                            status: FAILURE
                        })
                    }
                })
    }
}