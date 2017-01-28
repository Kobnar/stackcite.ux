import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

import * as actions from '../actions'

const apiEndpoint = 'http://api.localhost/v0/'
const thunkMiddleware = [ thunk ]
const mockStore = configureMockStore(thunkMiddleware)

describe('createConfirmToken', () => {

    afterEach(() => {
        nock.cleanAll()
    })

    it('dispatches correct CREATE_CONFIRM_TOKEN_REQUEST and CREATE_CONFIRM_TOKEN_SUCCESS actions for 204 response', () => {
        nock(apiEndpoint)
            .post('/users/conf/')
            .reply(204)

        const expected = [
            { type: actions.CREATE_CONFIRM_TOKEN_REQUEST },
            { type: actions.CREATE_CONFIRM_TOKEN_SUCCESS }
        ]

        const store = mockStore({})

        return store.dispatch(actions.createConfirmToken('test@email.com'))
            .then(() => {
                const result = store.getActions()
                expect(result).toEqual(expected)
            })
    })

    it('dispatches correct CREATE_CONFIRM_TOKEN_REQUEST and CREATE_CONFIRM_TOKEN_FAILURE actions for 404 response', () => {
        nock(apiEndpoint)
            .post('/users/conf/')
            .reply(404)

        const expected = [
            { type: actions.CREATE_CONFIRM_TOKEN_REQUEST },
            { type: actions.CREATE_CONFIRM_TOKEN_FAILURE }
        ]

        const store = mockStore({})

        return store.dispatch(actions.createConfirmToken('test@email.com'))
            .then(() => {
                const result = store.getActions()
                expect(result).toEqual(expected)
            })
    })
})

describe('confirmAccount', () => {

    afterEach(() => {
        nock.cleanAll()
    })

    it('dispatches correct CONFIRM_ACCOUNT_REQUEST and CONFIRM_ACCOUNT_SUCCESS actions for 204 response', () => {
        nock(apiEndpoint)
            .put('/users/conf/')
            .reply(204)

        const expected = [
            { type: actions.CONFIRM_ACCOUNT_REQUEST },
            { type: actions.CONFIRM_ACCOUNT_SUCCESS }
        ]

        const store = mockStore({})

        return store.dispatch(actions.confirmAccount('test@email.com'))
            .then(() => {
                const result = store.getActions()
                expect(result).toEqual(expected)
            })
    })

    it('dispatches correct CONFIRM_ACCOUNT_REQUEST and CONFIRM_ACCOUNT_FAILURE actions for 404 response', () => {
        nock(apiEndpoint)
            .put('/users/conf/')
            .reply(404)

        const expected = [
            { type: actions.CONFIRM_ACCOUNT_REQUEST },
            { type: actions.CONFIRM_ACCOUNT_FAILURE }
        ]

        const store = mockStore({})

        return store.dispatch(actions.confirmAccount('89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4'))
            .then(() => {
                const result = store.getActions()
                expect(result).toEqual(expected)
            })
    })
})