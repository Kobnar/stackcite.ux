import { REQUEST, SUCCESS } from 'api/actions'
import { LOCATION_CHANGE } from 'react-router-redux'

import { INIT, HIDE_NAV, TOGGLE_NAV } from '../actions'
import { init, navHidden } from '../reducers'

describe('init', () => {

    it('returns default "true"', () => {
        const result = init(undefined, { type: 'SOME_ACTION_TYPE' })
        expect(result).toEqual(true)
    })

    it('returns "true" if action.status is REQUEST', () => {
        const action = {
            type: INIT,
            status: REQUEST
        }
        const result = init(false, action)
        expect(result).toBe(true)
    })

    it('returns "false" if action.status is not REQUEST', () => {
        const action = {
            type: INIT,
            status: SUCCESS
        }
        const result = init(true, action)
        expect(result).toBe(false)
    })
})

describe('navHidden', () => {

    it('toggles states for TOGGLE_NAV', () => {
        const result = navHidden(false, { type: TOGGLE_NAV })
        expect(result).toEqual(true)
    })

    it('hides nav for HIDE_NAV', () => {
        const result = navHidden(false, { type: HIDE_NAV })
        expect(result).toEqual(true)
    })

    it('hides nav for LOCATION_CHANGE', () => {
        const result = navHidden(false, { type: LOCATION_CHANGE })
        expect(result).toEqual(true)
    })
})