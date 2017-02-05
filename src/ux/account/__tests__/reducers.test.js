import { GET, PUT, SUCCESS, FAILURE } from '../../../api/actions'
import { ACCOUNT } from '../actions'

import { user } from '../reducers'

describe('user', () => {

    it('returns user data if GET request was successful', () => {
        const action = {
            type: ACCOUNT,
            method: GET,
            status: SUCCESS,
            data: { id: '5895abce30f1935141af2c39' }
        }
        const newState = user({}, action)
        const result = newState.id
        expect(result).toEqual('5895abce30f1935141af2c39')
    })

    it('returns empty object if GET request failed', () => {
        const action = {
            type: ACCOUNT,
            method: GET,
            status: FAILURE,
            error: { detail: { request: 404 } }
        }
        const result = user({}, action)
        expect(result).toEqual({})
    })

    it('returns user data if PUT request was successful', () => {
        const action = {
            type: ACCOUNT,
            method: PUT,
            status: SUCCESS,
            data: { id: '5895abce30f1935141af2c39' }
        }
        const newState = user({}, action)
        const result = newState.id
        expect(result).toEqual('5895abce30f1935141af2c39')
    })

    it('returns empty object if PUT request failed', () => {
        const action = {
            type: ACCOUNT,
            method: PUT,
            status: FAILURE,
            error: { detail: { request: 404 } }
        }
        const result = user({}, action)
        expect(result).toEqual({})
    })
})