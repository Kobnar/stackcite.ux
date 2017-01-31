import deepFreeze from 'deep-freeze'
import { Schema } from 'normalizr'

import {
    SUCCESS, 
    POST_DOCUMENT,
    GET_DOCUMENT,
    PUT_DOCUMENT,
    DELETE_DOCUMENT,
    GET_COLLECTION } from '../actions'

import {
    mergeCache,
    deleteDocument,
    cache } from '../reducers'

describe('mergeCache', () => {

    it('does not alter original cache', () => {

        var existingCache = {
            things: {
                '588f479a30f193446790b28e': { name: 'Test Document 0'},
                '521f4793b0f193326790b22g': { name: 'Test Document 1'}
            }
        }

        var data = {
            things: {
                '521f4793b0f193326790b22g': { name: 'Test Document 1 (altered)'},
                '621f4793b0fa22526777h162': { name: 'Test Document 2'},
            }
        }

        deepFreeze(existingCache)
        mergeCache(existingCache, data)
    })

    it('merges two caches', () => {

        var existingCache = {
            things: {
                '588f479a30f193446790b28e': { name: 'Test Document 0'},
                '521f4793b0f193326790b22g': { name: 'Test Document 1'}
            }
        }

        var data = {
            things: {
                '521f4793b0f193326790b22g': { name: 'Test Document 1 (altered)'},
                '621f4793b0fa22526777h162': { name: 'Test Document 2'},
            }
        }

        const expected = {
            things: {
                '588f479a30f193446790b28e': { name: 'Test Document 0'},
                '521f4793b0f193326790b22g': { name: 'Test Document 1 (altered)'},
                '621f4793b0fa22526777h162': { name: 'Test Document 2'},
            }
        }

        var result = mergeCache(existingCache, data)

        expect(result).toEqual(expected)
    })

})

describe('deleteDocument', () => {

    it('does not alter original cache', () => {

        var existingCache = {
            things: {
                '588f479a30f193446790b28e': { name: 'Test Document 0'},
                '521f4793b0f193326790b22g': { name: 'Test Document 1'}
            }
        }

        deepFreeze(existingCache)
        deleteDocument(existingCache, '521f4793b0f193326790b22g')

    })

    it('deletes document from cache', () => {

        var existingCache = {
            things: {
                '588f479a30f193446790b28e': { name: 'Test Document 0'},
                '521f4793b0f193326790b22g': { name: 'Test Document 1'}
            }
        }

        const expected = {
            things: {
                '521f4793b0f193326790b22g': { name: 'Test Document 1'}
            }
        }

        const result = deleteDocument(existingCache, '588f479a30f193446790b28e')

        expect(result).toEqual(expected)

    })

})

describe('cache', () => {

    const thingSchema = new Schema('things', { idAttribute: 'id' })

    it('caches a retrieved document', () => {
        var action = {
            type: GET_DOCUMENT,
            status: SUCCESS,
            data: { id: '588f479a30f193446790b28e', name: 'Test Document' },
            schema: thingSchema }
        
        const expected = {
            things: {
                '588f479a30f193446790b28e': {
                    id: '588f479a30f193446790b28e', name: 'Test Document' }
            }
        }
        
        var result = cache({}, action)

        expect(result).toEqual(expected)

    })

    it('updates an existing cache with a retrieved document', () => {
        var existingCache = {
            things: {
                '521f4793b0f193326790b22g': {
                    id: '521f4793b0f193326790b22g', name: 'Test Document 0' },
                '621f4793b0fa22526777h162': {
                    id: '621f4793b0fa22526777h162', name: 'Test Document 1' }
            }
        }

        var action = {
            type: GET_DOCUMENT,
            status: SUCCESS,
            data: { id: '588f479a30f193446790b28e', name: 'New Document' },
            schema: thingSchema }
        
        const expected = {
            things: {
                '521f4793b0f193326790b22g': {
                    id: '521f4793b0f193326790b22g', name: 'Test Document 0' },
                '621f4793b0fa22526777h162': {
                    id: '621f4793b0fa22526777h162', name: 'Test Document 1' },
                '588f479a30f193446790b28e': {
                    id: '588f479a30f193446790b28e', name: 'New Document' }
            }
        }

        var result = cache(existingCache, action)

        expect(result).toEqual(expected)
    })

    it('caches a retrieved collection', () => {
        var action = {
            type: GET_COLLECTION,
            status: SUCCESS,
            data: {
                items: [
                    { id: '521f4793b0f193326790b22g', name: 'Test Document 0' },
                    { id: '621f4793b0fa22526777h162', name: 'Test Document 1' }
                    ]
                },
            schema: thingSchema
            }
        
        const expected = {
            things: {
                '521f4793b0f193326790b22g': {
                    id: '521f4793b0f193326790b22g', name: 'Test Document 0' },
                '621f4793b0fa22526777h162': {
                    id: '621f4793b0fa22526777h162', name: 'Test Document 1' }
            }
        }

        var result = cache({}, action)

        expect(result).toEqual(expected)
    })

    it('deletes a cached document', () => {
        var existingCache = {
            things: {
                '521f4793b0f193326790b22g': {
                    id: '521f4793b0f193326790b22g', name: 'Test Document 0' },
                '621f4793b0fa22526777h162': {
                    id: '621f4793b0fa22526777h162', name: 'Test Document 1' },
                '588f479a30f193446790b28e': {
                    id: '588f479a30f193446790b28e', name: 'Test Document 2' }
            }
        }

        var action = {
            type: DELETE_DOCUMENT,
            status: SUCCESS,
            route: 'things/',
            documentId: '621f4793b0fa22526777h162'
        }

        const expected = {
            things: {
                '521f4793b0f193326790b22g': {
                    id: '521f4793b0f193326790b22g', name: 'Test Document 0' },
                '588f479a30f193446790b28e': {
                    id: '588f479a30f193446790b28e', name: 'Test Document 2' }
            }
        }

        const result = cache(existingCache, action)

        expect(result).toEqual(expected)
    })

})