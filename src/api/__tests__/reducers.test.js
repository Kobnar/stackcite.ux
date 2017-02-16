import deepFreeze from 'deep-freeze'
import { Schema } from 'normalizr'

import {
    STACKCITE_API,
    POST,
    GET,
    PUT,
    DELETE,
    REQUEST,
    SUCCESS,
    FAILURE } from 'api/actions'

import {
    cache } from '../reducers'

describe('cache', () => {

    const testCollection = 'tests'
    const testSchema = new Schema(testCollection, { idAttribute: 'id' })
    const testAction = (method, status, documentId, data, error) => ({
            type: STACKCITE_API,
            method,
            status,
            data,
            error,
            schema: testSchema,
            collection: testCollection,
            documentId
    })

    it('does not mutate a given state', () => {
        const existingState = {}
        const newAction = testAction(
            POST, SUCCESS, undefined, { id: '58982f1930f193383f952a47' })
        deepFreeze(existingState)
        cache(existingState, newAction)
    })

    it('merges new document for a successful POST', () => {
        const existingState = {
            [testCollection]: {
                '58982f1930f193383f952a4b': { id: '58982f1930f193383f952a4b' }}}
        const responseData = { id: '58982f1930f193383f952a4f' }
        const newAction = testAction(
            POST, SUCCESS, undefined, responseData)
        const expected = {
            [testCollection]: {
                '58982f1930f193383f952a4b': { id: '58982f1930f193383f952a4b' },
                '58982f1930f193383f952a4f': { id: '58982f1930f193383f952a4f' }
            }}
        const result = cache(existingState, newAction)
        expect(result).toEqual(expected)
    })

    it('replaces existing document for a successful document-level GET', () => {
        const existingState = {
            [testCollection]: {
                '58982f1930f193383f952a4b': {
                    id: '58982f1930f193383f952a4b',
                    name: 'Test Document'},
                '58982f1930f193383f952a4f': {
                    id: '58982f1930f193383f952a4f',
                    name: 'Another Document'}}}
        const responseData = {
                id: '58982f1930f193383f952a4b',
                name: 'Modified Document'
            }
        const newAction = testAction(
            GET, SUCCESS, '58982f1930f193383f952a4b', responseData)
        const expected = {
            [testCollection]: {
                '58982f1930f193383f952a4b': {
                    id: '58982f1930f193383f952a4b',
                    name: 'Modified Document'},
                '58982f1930f193383f952a4f': {
                    id: '58982f1930f193383f952a4f',
                    name: 'Another Document'}}}
        const result = cache(existingState, newAction)
        expect(result).toEqual(expected)
    })

    it('merges new documents for a successful collection-level GET', () => {
        const existingState = {
            [testCollection]: {
                '58982f1930f193383f952a4b': { id: '58982f1930f193383f952a4b' }}}
        const responseData = {
            items: [
                { id: '58982f1930f193383f952a4f' },
                { id: '5898336130f1933caf7045b4' }
            ]
        }
        const newAction = testAction(POST, SUCCESS, undefined, responseData)
        const expected = {
            [testCollection]: {
                '58982f1930f193383f952a4b': { id: '58982f1930f193383f952a4b' },
                '58982f1930f193383f952a4f': { id: '58982f1930f193383f952a4f' }
            }}
    })

    it('deletes existing data for a successful DELETE', () => {
        const existingState = {
            [testCollection]: {
                '58982f1930f193383f952a4b': { id: '58982f1930f193383f952a4b' },
                '58982f1930f193383f952a4f': { id: '58982f1930f193383f952a4f' }
            }}
        const newAction = testAction(
            DELETE, SUCCESS, '58982f1930f193383f952a4f')
        const expected = {
            [testCollection]: {
                '58982f1930f193383f952a4b': { id: '58982f1930f193383f952a4b' }}}
        const result = cache(existingState, newAction)
        expect(result).toEqual(expected)
    })

    it('returns existing state if status not SUCCESS', () => {
        const existingState = {
            [testCollection]: {
                '58982f1930f193383f952a4b': { id: '58982f1930f193383f952a4b' },
                '58982f1930f193383f952a4f': { id: '58982f1930f193383f952a4f' }
            }}
        const newAction = testAction(DELETE, FAILURE, '58982f1930f193383f952a4b')
        const result = cache(existingState, newAction)
        expect(result).toEqual(existingState)
    })
})