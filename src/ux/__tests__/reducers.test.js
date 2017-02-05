import { REQUEST, SUCCESS } from 'api/actions'

import { INIT } from '../actions'
import { init } from '../reducers'

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