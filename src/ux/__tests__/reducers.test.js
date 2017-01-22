import deepFreeze from 'deep-freeze'

import ux from '../reducers'
import initialState from '../state'
import * as actions from '../actions'

describe('ux', () => {

    it('does not mutate initial state', () => {
        var action = { type: actions.TOGGLE_MOBILE_NAV_MENU }
        deepFreeze(initialState)
        ux(initialState, action)
    })

    it('toggles the mobile nav menu visibility', () => {
        var action = { type: actions.TOGGLE_MOBILE_NAV_MENU }
        var prevState = {
            ...initialState,
            mobileNavMenuVisible: true
        }
        var newState = ux(prevState, action)
        expect(newState.mobileNavMenuVisible).toBe(false)
    })

    it('shows the mobile nav menu', () => {
        var action = { type: actions.SHOW_MOBILE_NAV_MENU }
        var newState = ux(initialState, action)
        expect(newState.mobileNavMenuVisible).toBe(true)
    })

    it('hides the mobile nav menu', () => {
        var action = { type: actions.HIDE_MOBILE_NAV_MENU }
        var prevState = {
            ...initialState,
            mobileNavMenuVisible: true
        }
        var newState = ux(prevState, action)
        expect(newState.mobileNavMenuVisible).toBe(false)
    })

})