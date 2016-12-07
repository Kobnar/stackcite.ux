import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

import * as actions from '../actions'

const apiEndpoint = 'http://api.localhost/v0/'
const thunkMiddleware = [ thunk ]
const mockStore = configureMockStore(thunkMiddleware)

describe('login', () => {

    afterEach(() => {
        nock.cleanAll()
    })

    it('dispatches correct LOGIN_REQUEST and LOGIN_SUCCESS actions for 200 response', () => {
        const now = new Date().getTime()
        nock(apiEndpoint)
            .post('/auth/')
            .reply(200, {
                user: { id: '58479a173b360409947baf75' },
                key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4', issued: now, touched: now
            })

        const expected = [
            { type: actions.LOGIN_REQUEST },
            {
                type: actions.LOGIN_SUCCESS,
                user: { id: '58479a173b360409947baf75' },
                token: { key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4', issued: now, touched: now }
            }
        ]

        const store = mockStore({})

        return store.dispatch(actions.login('test_email', 'test_password'))
            .then(() => {
                const result = store.getActions()
                expect(result).toEqual(expected)
            })
    })

    it('dispatches correct LOGIN_REQUEST and LOGIN_FAILURE actions for 400 response', () => {
        nock(apiEndpoint)
            .post('/auth/')
            .reply(400)

        const expected = [
            { type: actions.LOGIN_REQUEST },
            {
                type: actions.LOGIN_FAILURE,
                status: 400,
                text: 'Bad Request'
            },
        ]

        const store = mockStore({})

        return store.dispatch(actions.login('test_email', 'test_password'))
            .then(() => {
                const result = store.getActions()
                expect(result).toEqual(expected)
            })
    })
})

describe('logout', () => {

    afterEach(() => {
        nock.cleanAll()
    })

    it('dispatches correct LOGOUT_REQUEST and LOGOUT_SUCCESS actions for 204 response', () => {
        nock(apiEndpoint)
            .delete('/auth/')
            .reply(204)

        const tokenKey = '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4'
        
        const expected = [
            { type: actions.LOGOUT_REQUEST },
            { type: actions.LOGOUT_SUCCESS }
        ]

        const store = mockStore({})
        
        return store.dispatch(actions.logout(tokenKey))
            .then(() => {
                const result = store.getActions()
                expect(result).toEqual(expected)
            })
    })

    it('dispatches correct LOGOUT_REQUEST and LOGOUT_FAILURE actions for 400 response', () => {
        nock(apiEndpoint)
            .delete('/auth/')
            .reply(400)

        const tokenKey = '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4'

        const expected = [
            { type: actions.LOGOUT_REQUEST },
            {
                type: actions.LOGOUT_FAILURE,
                status: 400,
                text: 'Bad Request'
            }
        ]

        const store = mockStore({})

        return store.dispatch(actions.logout(tokenKey))
            .then(() => {
                const result = store.getActions()
                expect(result).toEqual(expected)
            })
    })

})

describe('touchToken', () => {

    afterEach(() => {
        nock.cleanAll()
    })

    it('dispatches correct TOUCH_TOKEN_REQUEST and TOUCH_TOKEN_SUCCESS actions on 200 response', () => {

        const now = new Date().getTime()
        const tokenKey = '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4'

        nock(apiEndpoint)
            .put('/auth/')
            .reply(200, {
                user: { id: '58479a173b360409947baf75' },
                key: tokenKey, issued: now, touched: now
            })

        const expected = [
            { type: actions.TOUCH_TOKEN_REQUEST },
            {
                type: actions.TOUCH_TOKEN_SUCCESS,
                user: { id: '58479a173b360409947baf75' },
                token: { key: tokenKey, issued: now, touched: now }
            }
        ]

        const store = mockStore({})

        return store.dispatch(actions.touchToken(tokenKey))
            .then(() => {
                const result = store.getActions()
                expect(result).toEqual(expected)
            })

    })

    it('dispatches correct TOUCH_TOKEN_REQUEST and TOUCH_TOKEN_FAILURE actions on 400 response', () => {
        
        const tokenKey = '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4'

        nock(apiEndpoint)
            .put('/auth/')
            .reply(400)

        const expected = [
            { type: actions.TOUCH_TOKEN_REQUEST },
            {
                type: actions.TOUCH_TOKEN_FAILURE,
                status: 400,
                text: 'Bad Request'
            }
        ]

        const store = mockStore({})

        return store.dispatch(actions.touchToken(tokenKey))
            .then(() => {
                const result = store.getActions()
                expect(result).toEqual(expected)
            })

    })

})