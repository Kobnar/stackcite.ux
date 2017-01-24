import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

import * as actions from '../actions'

const apiEndpoint = 'http://api.localhost/v0/'
const thunkMiddleware = [ thunk ]
const mockStore = configureMockStore(thunkMiddleware)

describe('signup', () => {

    afterEach(() => {
        nock.cleanAll()
    })

    it('dispatches SIGNUP_REQUEST and SIGNUP_SUCCESS actions for 201 response', () => {

        const now = new Date().getTime()
        nock(apiEndpoint)
            .post('/users/')
            .reply(201, {
                id: '58479a173b360409947baf75',
                email: 'test@email.com',
                groups: ['users'],
                joined: now,
                last_login: null
            })

        const expected = [
            { type: actions.SIGNUP_REQUEST },
            { type: actions.SIGNUP_SUCCESS }
        ]

        const store = mockStore({})

        return store.dispatch(actions.signup('test@email.com', 't3stPa$$word'))
            .then(() => {
                const result = store.getActions()
                expect(result).toEqual(expected)
            })
    })

    it('dispatches SIGNUP_REQUEST and SIGNUP_FAILURE actions for 400 response', () => {

        const now = new Date().getTime()
        nock(apiEndpoint)
            .post('/users/')
            .reply(400, {
                'code': 400,
                'title': 'Bad Request',
                'detail': {
                    email: 'Not a valid email address.'
                }
            })

        const expected = [
            { type: actions.SIGNUP_REQUEST },
            {
                type: actions.SIGNUP_FAILURE,
                errors: {
                    email: 'Not a valid email address.'
                }
            }
        ]

        const store = mockStore({})

        return store.dispatch(actions.signup('test', 'T3stPa$$word'))
            .then(() => {
                const result = store.getActions()
                expect(result).toEqual(expected)
            })
    })
})