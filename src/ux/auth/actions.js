import { save, load, remove } from 'react-cookie'

import api from 'api'
import { SUCCESS } from 'api/actions'

const COOKIE_NAME = 'key'

export const saveCookie = (tokenKey) => {
    return save(COOKIE_NAME, tokenKey)
}

export const loadCookie = () => {
    return load(COOKIE_NAME)
}

export const removeCookie = () => {
    return remove(COOKIE_NAME)
}

export const login = (email, password) => {
    return (dispatch) => {
        return dispatch(api.users.auth.create(email, password))
            .then(action => {
                if (action.status === SUCCESS) {
                    saveCookie(action.data.token.key)
                    return action
                } else {
                    removeCookie()
                    return action
                }
            })
    }
}

export const touchLogin = (authKey) => {
    return (dispatch) => {
        return dispatch(api.users.auth.update(authKey))
            .then(action => {
                if (action.status === SUCCESS) {
                    saveCookie(action.data.token.key)
                    return action
                } else {
                    removeCookie()
                    return action
                }
            })
    }
}

export const logout = (authKey) => {
    return (dispatch) => {
        return dispatch(api.users.auth.delete(authKey))
            .then(action => {
                removeCookie()
                return action
            })
    }
}