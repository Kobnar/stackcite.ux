import deepFreeze from 'deep-freeze'

import {
    REQUEST,
    SUCCESS,
    FAILURE } from 'api/actions'

import {
    AUTH,
    LOGIN,
    TOUCH,
    LOGOUT } from '../actions'

import {
    user,
    token } from '../reducers'

describe('user', () => {

    it('does not mutate a given state', () => {
        const existingState = {}
        const newAction = {
            type: AUTH,
            method: LOGIN,
            status: SUCCESS,
            data: {
                user: { id: '5892050630f1931c66751a14', groups: ['users'] },
                token: { key: '2f4f1f161678c53a24916ec2a1153043dca62b27cd54b0b01032a008', issued: '2017-02-02 11:02:35.650206', touched: '2017-02-02 11:02:35.650206'}
            }
        }
        deepFreeze(existingState)
        user(existingState, newAction)
    })

    it('returns state with user id set for LOGIN SUCCESS', () => {
        const newAction = {
            type: AUTH,
            method: LOGIN,
            status: SUCCESS,
            data: {
                user: { id: '5892050630f1931c66751a14', groups: ['users'] },
                token: { key: '2f4f1f161678c53a24916ec2a1153043dca62b27cd54b0b01032a008', issued: '2017-02-02 11:02:35.650206', touched: '2017-02-02 11:02:35.650206'}
            }
        }
        const newState = user({}, newAction)
        const result = newState.id
        expect(result).toEqual('5892050630f1931c66751a14')
    })

    it('returns state with user id set for TOUCH SUCCESS', () => {
        const newAction = {
            type: AUTH,
            method: TOUCH,
            status: SUCCESS,
            data: {
                user: { id: '5892050630f1931c66751a14', groups: ['users'] },
                token: { key: '2f4f1f161678c53a24916ec2a1153043dca62b27cd54b0b01032a008', issued: '2017-02-02 11:02:35.650206', touched: '2017-02-02 11:02:35.650206'}
            }
        }
        const newState = user({}, newAction)
        const result = newState.id
        expect(result).toEqual('5892050630f1931c66751a14')
    })

    it('returns empty user for LOGOUT SUCCESS', () => {
        const existingState = { id: '5892050630f1931c66751a14', groups: ['users'] }
        const newAction = {
            type: AUTH,
            method: LOGOUT,
            status: SUCCESS
        }
        const newState = user(existingState, newAction)
        const result = newState.id
        expect(result).toEqual(undefined)
    })

    it('returns empty user for LOGIN FAILURE', () => {
        const existingState = { id: '5892050630f1931c66751a14', groups: ['users'] }
        const newAction = {
            type: AUTH,
            method: LOGIN,
            status: FAILURE
        }
        const newState = user(existingState, newAction)
        const result = newState.id
        expect(result).toEqual(undefined)
    })

    it('returns empty user for TOUCH FAILURE', () => {
        const existingState = { id: '5892050630f1931c66751a14', groups: ['users'] }
        const newAction = {
            type: AUTH,
            method: TOUCH,
            status: FAILURE
        }
        const newState = user(existingState, newAction)
        const result = newState.id
        expect(result).toEqual(undefined)
    })

    it('returns empty user for LOGOUT FAILURE', () => {
        const existingState = { id: '5892050630f1931c66751a14', groups: ['users'] }
        const newAction = {
            type: AUTH,
            method: TOUCH,
            status: FAILURE
        }
        const newState = user(existingState, newAction)
        const result = newState.id
        expect(result).toEqual(undefined)
    })
})

describe('token', () => {

    it('returns state with token key set for LOGIN SUCCESS', () => {
        const newAction = {
            type: AUTH,
            method: LOGIN,
            status: SUCCESS,
            data: {
                user: { id: '5892050630f1931c66751a14', groups: ['users'] },
                token: { key: '2f4f1f161678c53a24916ec2a1153043dca62b27cd54b0b01032a008', issued: '2017-02-02 11:02:35.650206', touched: '2017-02-02 11:02:35.650206'}
            }
        }
        const newState = token({}, newAction)
        const result = newState.key
        expect(result).toEqual('2f4f1f161678c53a24916ec2a1153043dca62b27cd54b0b01032a008')
    })

    it('returns state with token key set for TOUCH SUCCESS', () => {
        const newAction = {
            type: AUTH,
            method: TOUCH,
            status: SUCCESS,
            data: {
                user: { id: '5892050630f1931c66751a14', groups: ['users'] },
                token: { key: '2f4f1f161678c53a24916ec2a1153043dca62b27cd54b0b01032a008', issued: '2017-02-02 11:02:35.650206', touched: '2017-02-02 11:02:35.650206'}
            }
        }
        const newState = token({}, newAction)
        const result = newState.key
        expect(result).toEqual('2f4f1f161678c53a24916ec2a1153043dca62b27cd54b0b01032a008')
    })

    it('returns empty token for LOGOUT SUCCESS', () => {
        const existingState = { key: '2f4f1f161678c53a24916ec2a1153043dca62b27cd54b0b01032a008', issued: '2017-02-02 11:02:35.650206', touched: '2017-02-02 11:02:35.650206'}
        const newAction = {
            type: AUTH,
            method: LOGOUT,
            status: SUCCESS
        }
        const newState = token(existingState, newAction)
        const result = newState.key
        expect(result).toEqual(undefined)
    })

    it('returns empty token for LOGIN FAILURE', () => {
        const existingState = { key: '2f4f1f161678c53a24916ec2a1153043dca62b27cd54b0b01032a008', issued: '2017-02-02 11:02:35.650206', touched: '2017-02-02 11:02:35.650206'}
        const newAction = {
            type: AUTH,
            method: LOGIN,
            status: FAILURE
        }
        const newState = token(existingState, newAction)
        const result = newState.key
        expect(result).toEqual(undefined)
    })

    it('returns empty token for TOUCH FAILURE', () => {
        const existingState = { key: '2f4f1f161678c53a24916ec2a1153043dca62b27cd54b0b01032a008', issued: '2017-02-02 11:02:35.650206', touched: '2017-02-02 11:02:35.650206'}
        const newAction = {
            type: AUTH,
            method: TOUCH,
            status: FAILURE
        }
        const newState = token(existingState, newAction)
        const result = newState.key
        expect(result).toEqual(undefined)
    })

    it('returns empty token for LOGOUT FAILURE', () => {
        const existingState = { key: '2f4f1f161678c53a24916ec2a1153043dca62b27cd54b0b01032a008', issued: '2017-02-02 11:02:35.650206', touched: '2017-02-02 11:02:35.650206'}
        const newAction = {
            type: AUTH,
            method: TOUCH,
            status: FAILURE
        }
        const newState = token(existingState, newAction)
        const result = newState.key
        expect(result).toEqual(undefined)
    })
})

describe('auth', () => {

})