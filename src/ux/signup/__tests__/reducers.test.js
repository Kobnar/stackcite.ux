import deepFreeze from 'deep-freeze'

import {
    REST_API,
    REQUEST,
    SUCCESS,
    FAILURE } from 'api/actions'
    
import { SIGNUP } from '../actions'
import { success } from '../reducers'

describe('success', () => {

    it('returns true if action.status is SUCCESS', () => {
        const action = {
            type: SIGNUP,
            status: SUCCESS
        }
        const result = success(false, action)
        expect(result).toEqual(true)
    })

    it('returns false if action.status is not SUCCESS', () => {
        const action = {
            type: REST_API,
            status: FAILURE
        }
        const result = success(false, action)
        expect(result).toEqual(false)
    })
})