import deepFreeze from 'deep-freeze'

import app from '../reducers'
import initialState from '../state'
import * as actions from '../actions'

import * as authActions from '../auth/actions'

describe('app', () => {

    it('child action does not mutate initial state', () => {
        var action = { type: authActions.LOGIN_REQUEST }
        deepFreeze(initialState)
        app(initialState, action)
    })

    it('TOGGLE_MOBILE_NAV_MENU switches mobile nav menu visibility from true to false', () => {
        var action = { type: actions.TOGGLE_MOBILE_NAV_MENU }
        var prevState = {
            ...initialState,
            ux: { mobileNavMenuVisible: true }
        }
        var newState = app(prevState, action)
        expect(newState.ux.mobileNavMenuVisible).toBe(false)
    })

    it('SHOW_MOBILE_NAV_MENU sets mobile nav menu visibily from false to true', () => {
        var action = { type: actions.SHOW_MOBILE_NAV_MENU }
        var newState = app(initialState, action)
        expect(newState.ux.mobileNavMenuVisible).toBe(true)
    })

    it('HIDE_MOBILE_NAV_MENU sets mobile nav menu visibily from true to false', () => {
        var action = { type: actions.HIDE_MOBILE_NAV_MENU }
        var prevState = {
            ...initialState,
            ux: { mobileNavMenuVisible: true }
        }
        var newState = app(prevState, action)
        expect(newState.ux.mobileNavMenuVisible).toBe(false)
    })

})