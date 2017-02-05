import { LOCATION_CHANGE } from 'react-router-redux'

import { REQUEST, SUCCESS, FAILURE } from '../../api/actions'
import { loading, errors, success } from '../utils'

const ACTION_TYPE = 'ACTION_TYPE'

describe('loading', () => {

    it('returns "true" if a action.status was REQUEST', () => {
        const action = {
            type: ACTION_TYPE,
            status: REQUEST
        }
        const result = loading(ACTION_TYPE, false, action)
        expect(result).toEqual(true)
    })

    it('returns "false" if a action.status was not REQUEST', () => {
        const action = {
            type: ACTION_TYPE,
            status: SUCCESS
        }
        const result = loading(ACTION_TYPE, true, action)
        expect(result).toEqual(false)
    })
})

describe('errors', () => {

    it('returns errors if action.status was FAILURE', () => {
        const expected = { test: 'Test failure.' }
        const action = {
            type: ACTION_TYPE,
            status: FAILURE,
            error: { detail: { ...expected } }
        }
        const result = errors(ACTION_TYPE, {}, action)
        expect(result).toEqual(expected)
    })

    it('returns errors object with "request" key set to error.code', () => {
        const expected = { request: 409 }
        const action = {
            type: ACTION_TYPE,
            status: FAILURE,
            error: { code: 409 }
        }
        const result = errors(ACTION_TYPE, {}, action)
        expect(result).toEqual(expected)
    })

    it('returns empty object if action.status was not FAILURE', () => {
        const previousState = { test: 'Test failure.' }
        const action = {
            type: ACTION_TYPE,
            status: SUCCESS
        }
        const result = errors(ACTION_TYPE, previousState, action)
        expect(result).toEqual({})
    })

    it('returns empty object if action.type was LOCATION_CHANGE', () => {
        const action = { type: LOCATION_CHANGE }
        const result = errors(ACTION_TYPE, { test: 'Test failure.' }, action)
        expect(result).toEqual({})
    })
})

describe('success', () => {

    it('returns "true" if action.status was SUCCESS', () => {
        const action = {
            type: ACTION_TYPE,
            status: SUCCESS
        }
        const result = success(ACTION_TYPE, false, action)
        expect(result).toEqual(true)
    })

    it('returns "false" if action.status was not SUCCESS', () => {
        const action = {
            type: ACTION_TYPE,
            status: FAILURE
        }
        const result = success(ACTION_TYPE, false, action)
        expect(result).toEqual(false)
    })

    it('returns "false" if action.type was LOCATION_CHANGE', () => {
        const action = { type: LOCATION_CHANGE }
        const result = success(ACTION_TYPE, true, action)
        expect(result).toEqual(false)
    })
})