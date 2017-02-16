import { LOCATION_CHANGE } from 'react-router-redux'

import { REQUEST, SUCCESS, FAILURE } from '../../api/actions'
import {
    readDate,
    getFormData,
    filterCollection,
    loading,
    errors,
    success } from '../utils'

const ACTION_TYPE = 'ACTION_TYPE'

describe('readDate', () => {

    it('converts negative values to positive B.C.E.', () => {
        const expected = '399 B.C.E.'
        const result = readDate(-399)
        expect(result).toEqual(expected)
    })
})

describe('getFormData', () => {

    it('sets all truthy values', () => {
        const data = {
            fieldA: 'Some value',
            feildB: '',
            fieldC: undefined,
            fieldD: 23 }
        const expected = ['FieldA', 'fieldC']
        const keys = Object.keys(getFormData(data)).sort()
        const result = keys.includes('fieldA') && keys.includes('fieldD')
        expect(result).toBeTruthy()
    })

    it('does not set falsy values', () => {
        const data = {
            fieldA: 'Some value',
            feildB: '',
            fieldC: undefined,
            fieldD: 23}
        const keys = Object.keys(getFormData(data)).sort()
        const result = keys.includes('fieldB') || keys.includes('fieldC')
        expect(result).toBeFalsy()
    })

    it('only sets explicity defined truthy fields', () => {
        const data = {
            fieldA: 'Some value',
            feildB: '',
            fieldC: undefined,
            fieldD: 23 }
        const fields = ['fieldA', 'fieldB']
        const keys = Object.keys(getFormData(data, fields)).sort()
        const result = keys.includes('fieldA')
        expect(result).toBeTruthy()
    })

    it('does not set explicity defined falsy fields', () => {
        const data = {
            fieldA: 'Some value',
            feildB: '',
            fieldC: undefined,
            fieldD: 23 }
        const fields = ['fieldA', 'fieldB']
        const keys = Object.keys(getFormData(data, fields)).sort()
        const result = keys.includes('fieldB')
        expect(result).toBeFalsy()
    })
})

describe('filterCollection', () => {

    it('returns entire collection if filter is empty', () => {
        const collection = {
            '58a56e6330f193518bcbc257': { id: '58a56e6330f193518bcbc257' },
            '58a56e6330f193518bcbc258': { id: '58a56e6330f193518bcbc258' },
            '58a56e6330f193518bcbc259': { id: '58a56e6330f193518bcbc259' },
            '58a56e6330f193518bcbc25a': { id: '58a56e6330f193518bcbc25a' },
            '58a56e6330f193518bcbc25b': { id: '58a56e6330f193518bcbc25b' }}
        const expected = [
            { id: '58a56e6330f193518bcbc257' },
            { id: '58a56e6330f193518bcbc258' },
            { id: '58a56e6330f193518bcbc259' },
            { id: '58a56e6330f193518bcbc25a' },
            { id: '58a56e6330f193518bcbc25b' }]
        const result = filterCollection(collection, [])
        expect(result).toEqual(expected)
    })

    it('returns filtered collection if filter is set', () => {
        const collection = {
            '58a56e6330f193518bcbc257': { id: '58a56e6330f193518bcbc257' },
            '58a56e6330f193518bcbc258': { id: '58a56e6330f193518bcbc258' },
            '58a56e6330f193518bcbc259': { id: '58a56e6330f193518bcbc259' },
            '58a56e6330f193518bcbc25a': { id: '58a56e6330f193518bcbc25a' },
            '58a56e6330f193518bcbc25b': { id: '58a56e6330f193518bcbc25b' }}
        const filter = ['58a56e6330f193518bcbc259', '58a56e6330f193518bcbc25a']
        const expected = [
            { id: '58a56e6330f193518bcbc259' },
            { id: '58a56e6330f193518bcbc25a' }]
        const result = filterCollection(collection, filter)
        expect(result).toEqual(expected)
    })
})

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