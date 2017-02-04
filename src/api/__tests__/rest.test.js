import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

import * as rest from '../actions'

const thunkMiddleware = [ thunk ]
const mockStore = configureMockStore(thunkMiddleware)

const TEST_ENDPOINT = 'http://api.test/v0/'

describe('IndexResource', () => {

    describe('connect() instance', () => {

        it('sets correct parent', () => {
            const parentResource = new rest.IndexResource('parent')
            const childResource = new rest.IndexResource('child')
            parentResource.connect(childResource)
            const result = childResource.parent.name
            expect(result).toEqual('parent')
        })
    })

    describe('connect() class', () => {

        it('sets correct name when instantiating a new class', () => {
            const name = 'child'
            const parentResource = new rest.IndexResource('parent')
            parentResource.connect(rest.IndexResource, name)
            const result = parentResource[name].name
            expect(result).toEqual(name)
        })

        it('sets correct parent when instantiating a new class', () => {
            const parentResource = new rest.IndexResource('parent')
            parentResource.connect(rest.IndexResource, 'child')
            const result = parentResource.child.parent
            expect(result).toBe(parentResource)
        })
    })

    describe('route()', () => {

        it('returns a route with its own name if it has no parent', () => {
            const testResource = new rest.IndexResource('test')
            const expected = 'test/'
            const result = testResource.route()
            expect(result).toEqual(expected)
        })

        it('returns a route containing every parent\'s name', () => {
            const rootResource = new rest.IndexResource('root')
            rootResource.connect(rest.IndexResource, 'child')
            rootResource.child.connect(rest.IndexResource, 'grandchild')
            const expected = 'root/child/grandchild/'
            const result = rootResource.child.grandchild.route()
            expect(result).toEqual(expected)
        })
    })

    describe('toString()', () => {

        it('returns the resource name', () => {
            const name = 'test'
            const testResource = new rest.IndexResource(name)
            const result = testResource.toString()
            expect(result).toEqual(name)
        })
    })
})

describe('DocumentResource', () => {

    afterEach(() => {
        nock.cleanAll()
    })

    describe('retrieve()', () => {})

    describe('update()', () => {})

    describe('delete()', () => {})
})

describe('CollectionResource', () => {

    afterEach(() => {
        nock.cleanAll()
    })

    describe('create()', () => {

        it('dispatches SUCCESS for 201 CREATED', () => {
            const store = mockStore({})
            const root = new rest.IndexResource(TEST_ENDPOINT)
            root.connect(rest.CollectionResource, 'test')
            nock(TEST_ENDPOINT)
                .post('test/')
                .reply(201, {
                    id: '588c81b730f19354071196ef',
                    name: 'Test Document'})
            return store.dispatch(
                root.test.create("test/", { name: 'Test Document' }))
                    .then(() => {
                        var result = store.getActions()
                        var result = result.map(action => action.status)
                        expect(result).toContain(SUCCESS)
                    })
        })
    })

    describe('retrieve()', () => {})

    describe('update()', () => {})

    describe('delete()', () => {})

    describe('document()', () => {

        it('creates child document with matching id', () => {
            const documentId = '5892050630f1931c66751a14'
            const testResource = new rest.CollectionResource('test')
            const result = testResource.document(documentId).name
            expect(result).toEqual(documentId)
        })
    })
})