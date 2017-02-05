import { LOCATION_CHANGE } from 'react-router-redux'

import { REQUEST, SUCCESS, FAILURE } from 'api/actions'
import { AUTH } from 'api/users/auth/actions'

import { loading, errors } from '../reducers'

describe('loading', () => {

    it('returns "true" if a given action.status was REQUEST', () => {
        const action = {
            type: AUTH,
            status: REQUEST
        }
        const result = loading(false, action)
        expect(result).toEqual(true)
    })

    it('returns "false" if a given action.status was not REQUEST', () => {
        const action = {
            type: AUTH,
            status: SUCCESS
        }
        const result = loading(true, action)
        expect(result).toEqual(false)
    })
})

describe('errors', () => {

    it('returns errors if given action.status was FAILURE', () => {
        const expected = { test: 'Test failure.' }
        const action = {
            type: AUTH,
            status: FAILURE,
            error: { detail: { ...expected } }
        }
        const result = errors({}, action)
        expect(result).toEqual(expected)
    })

    it('returns empty object if given action.status was not FAILURE', () => {
        const previousState = { test: 'Test failure.' }
        const action = {
            type: AUTH,
            status: SUCCESS
        }
        const result = errors(previousState, action)
        expect(result).toEqual({})
    })

    it('returns empty object if given action.type was LOCATION_CHANGE', () => {
        const action = { type: LOCATION_CHANGE }
        const result = errors({ test: 'Test failure.' }, action)
        expect(result).toEqual({})
    })
})