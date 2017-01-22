import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

import * as actions from '../actions'

describe('toggleMobileNavMenu', () => {
    it('returns a dispatch object with a TOGGLE_MOBILE_NAV_MENU type', () => {
        var result = actions.toggleMobileNavMenu()
        expect(result.type).toEqual(actions.TOGGLE_MOBILE_NAV_MENU)
    })
})

describe('showMobileNavMenu', () => {
    it('returns a dispatch object with a SHOW_MOBILE_NAV_MENU type', () => {
        var result = actions.showMobileNavMenu()
        expect(result.type).toEqual(actions.SHOW_MOBILE_NAV_MENU)
    })
})

describe('hideMobileNavMenu', () => {
    it('returns a dispatch object with a SHOW_MOBILE_NAV_MENU type', () => {
        var result = actions.hideMobileNavMenu()
        expect(result.type).toEqual(actions.HIDE_MOBILE_NAV_MENU)
    })
})