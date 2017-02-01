import { push } from 'react-router-redux'
import * as cookie from 'react-cookie'

import { SUCCESS } from '../api/actions'
import authEndpoint from '../api/users/auth/actions'

export const COOKIE_NAME = 'key'

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

export const saveToken = (tokenKey) => {
    return cookie.save(COOKIE_NAME, tokenKey)
}

export const loadToken = () => {
    return cookie.load(COOKIE_NAME)
}

export const removeToken = () => {
    return cookie.remove(COOKIE_NAME)
}