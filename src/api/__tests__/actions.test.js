import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

import * as actions from '../actions'

const testEndpoint = 'http://api.localhost/v0/'
const documentId = '588c81b730f19354071196ef'

const thunkMiddleware = [ thunk ]
const mockStore = configureMockStore(thunkMiddleware)

describe('createDocument', () => {

    afterEach(() => {
        nock.cleanAll()
    })

    it('dispatches SUCCESS for 201 CREATED', () => {

        nock(testEndpoint)
            .post("/test/")
            .reply(201, {
                id: documentId
            })
        
        const store = mockStore({})

        return store.dispatch(actions.createDocument("test/", {}))
            .then(() => {
                var result = store.getActions()
                var result = actions.map(action.status)
                expect(result).toContain(actions.SUCCESS)
            })
    })

})