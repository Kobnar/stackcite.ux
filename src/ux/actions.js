import { push } from 'react-router-redux'

import { SUCCESS } from '../api/actions'
import * as actions from '../api/users/auth/actions'

export const HIDE_MOBILE_NAV_MENU = 'HIDE_MOBILE_NAV_MENU'
export const SHOW_MOBILE_NAV_MENU = 'SHOW_MOBILE_NAV_MENU'
export const TOGGLE_MOBILE_NAV_MENU = 'TOGGLE_MOBILE_NAV_MENU'

export const hideMobileNavMenu = () => {
    return { type: HIDE_MOBILE_NAV_MENU }
}

export const showMobileNavMenu = () => {
    return { type: SHOW_MOBILE_NAV_MENU }
}

export const toggleMobileNavMenu = () => {
    return { type: TOGGLE_MOBILE_NAV_MENU }
}

export const logout = (tokenKey) => {
    return (dispatch) => {
        return dispatch(actions.deleteAuthToken(tokenKey))
            .then(action => {
                if (action.status === SUCCESS) {
                    return dispatch(push('/login'))
                }
            })
    }
}