import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

import API, { REQUEST, SUCCESS, FAILURE } from '../actions'

const thunkMiddleware = [ thunk ]
const mockStore = configureMockStore(thunkMiddleware)

const TEST_ENDPOINT = 'http://api.localhost/v0/'

describe('API.create()', ()=> {

    afterEach(() => {
        nock.cleanAll()
    })

    it('dispatches success action for 201 CREATED', () => {

        nock(TEST_ENDPOINT)
            .post('test/')
            .reply(201, {
                id: '588c81b730f19354071196ef',
                name: 'Test Document'
            })

        const store = mockStore({})

        return store.dispatch(API.create("test/", { name: 'Test Document' }))
            .then(() => {
                var result = store.getActions()
                var result = result.map(action => action.status)
                expect(result).toContain(SUCCESS)
            })
    })

    it('dispatches failure action for 400 BAD REQUEST', () => {

        nock(TEST_ENDPOINT)
            .post('test/')
            .reply(400, {
                'code': 400,
                'title': 'Bad Request',
                'detail': {}
            })

        const store = mockStore({})

        return store.dispatch(API.create("test/", { name: 'Test Document' }))
            .then(() => {
                var result = store.getActions()
                var result = result.map(action => action.status)
                expect(result).toContain(FAILURE)
            })
    })

    it('dispatches failure action for 403 FORBIDDEN', () => {

        nock(TEST_ENDPOINT)
            .post('test/')
            .reply(403, {
                'code': 403,
                'title': 'Forbidden',
                'detail': {}
            })

        const store = mockStore({})

        return store.dispatch(API.create("test/", { name: 'Test Document' }))
            .then(() => {
                var result = store.getActions()
                var result = result.map(action => action.status)
                expect(result).toContain(FAILURE)
            })
    })

    it('dispatches failure action for 409 CONFLICT', () => {

        nock(TEST_ENDPOINT)
            .post('test/')
            .reply(409, {
                'code': 409,
                'title': 'Conflict',
                'detail': {}
            })

        const store = mockStore({})

        return store.dispatch(API.create("test/", { name: 'Test Document' }))
            .then(() => {
                var result = store.getActions()
                var result = result.map(action => action.status)
                expect(result).toContain(FAILURE)
            })
    })

})

describe('API.retrieve()', ()=> {

    afterEach(() => {
        nock.cleanAll()
    })

    it('dispatches success action for 200 OK', () => {

        nock(TEST_ENDPOINT)
            .post('test/')
            .reply(200, {
                id: '588c81b730f19354071196ef',
                name: 'Test Document'
            })

        const store = mockStore({})

        return store.dispatch(API.retrieve("test/", '588c81b730f19354071196ef'))
            .then(() => {
                var result = store.getActions()
                var result = result.map(action => action.status)
                expect(result).toContain(SUCCESS)
            })
    })

    it('dispatches failure action for 404 NOT FOUND', () => {

        nock(TEST_ENDPOINT)
            .post('test/')
            .reply(404, {
                'code': 404,
                'title': 'Not Found',
                'detail': {}
            })

        const store = mockStore({})

        return store.dispatch(API.retrieve("test/", '588c81b730f19354071196ef'))
            .then(() => {
                var result = store.getActions()
                var result = result.map(action => action.status)
                expect(result).toContain(FAILURE)
            })
    })

})

describe('API.update()', ()=> {

    afterEach(() => {
        nock.cleanAll()
    })

    it('dispatches success action for 200 OK', () => {

        nock(TEST_ENDPOINT)
            .post('test/')
            .reply(200, {
                id: '588c81b730f19354071196ef',
                name: 'Test Document'
            })

        const store = mockStore({})

        return store.dispatch(API.update("test/", '588c81b730f19354071196ef', { name: 'Test Document' }))
            .then(() => {
                var result = store.getActions()
                var result = result.map(action => action.status)
                expect(result).toContain(SUCCESS)
            })
    })

    it('dispatches failure action for 400 BAD REQUEST', () => {

        nock(TEST_ENDPOINT)
            .post('test/')
            .reply(400, {
                'code': 400,
                'title': 'Bad Request',
                'detail': {}
            })

        const store = mockStore({})

        return store.dispatch(API.update("test/", '588c81b730f19354071196ef', { name: 'Test Document' }))
            .then(() => {
                var result = store.getActions()
                var result = result.map(action => action.status)
                expect(result).toContain(FAILURE)
            })
    })

    it('dispatches failure action for 409 CONFLICT', () => {

        nock(TEST_ENDPOINT)
            .post('test/')
            .reply(409, {
                'code': 409,
                'title': 'Conflict',
                'detail': {}
            })

        const store = mockStore({})

        return store.dispatch(API.update("test/", '588c81b730f19354071196ef', { name: 'Test Document' }))
            .then(() => {
                var result = store.getActions()
                var result = result.map(action => action.status)
                expect(result).toContain(FAILURE)
            })
    })

})

describe('API.delete()', ()=> {

    afterEach(() => {
        nock.cleanAll()
    })

    it('dispatches success action for 204 NO CONTENT', () => {

        nock(TEST_ENDPOINT)
            .post('test/')
            .reply(204)

        const store = mockStore({})

        return store.dispatch(API.delete("test/", '588c81b730f19354071196ef'))
            .then(() => {
                var result = store.getActions()
                var result = result.map(action => action.status)
                expect(result).toContain(SUCCESS)
            })
    })

    it('dispatches failure action for 403 FORBIDDEN', () => {

        nock(TEST_ENDPOINT)
            .post('test/')
            .reply(403)

        const store = mockStore({})

        return store.dispatch(API.delete("test/", '588c81b730f19354071196ef'))
            .then(() => {
                var result = store.getActions()
                var result = result.map(action => action.status)
                expect(result).toContain(FAILURE)
            })
    })

    it('dispatches failure action for 404 NOT FOUND', () => {

        nock(TEST_ENDPOINT)
            .post('test/')
            .reply(404, {
                'code': 404,
                'title': 'Not Found',
                'detail': {}
            })

        const store = mockStore({})

        return store.dispatch(API.delete("test/", '588c81b730f19354071196ef'))
            .then(() => {
                var result = store.getActions()
                var result = result.map(action => action.status)
                expect(result).toContain(FAILURE)
            })
    })

})