import deepFreeze from 'deep-freeze'

import initialState from '../state'
import users from '../reducers'
import * as actions from '../actions'

describe('users', () => {

    it('returns default initial state without any action', () => {
        var result = users(undefined, {});
        expect(result).toEqual(initialState)
    })

    it('returns loading for SIGNUP_REQUEST action', () => {
        var expected = {
            ...initialState,
            loading: true }

        var action = { type: actions.SIGNUP_REQUEST }
        var result = users(action, {})
    })

    it('returns loading for SIGNUP_SUCCESS action', () => {
        var expected = {
            ...initialState,
            loading: false }
            
        var action = { type: actions.SIGNUP_SUCCESS }
        var result = users(action, {})
    })

    it('returns loading for SIGNUP_FAILURE action', () => {
        var expected = {
            ...initialState,
            loading: false }
            
        var action = { type: actions.SIGNUP_FAILURE }
        var result = users(action, {})
    })
})