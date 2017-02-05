import deepFreeze from 'deep-freeze'

import {
    REST_API,
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

    it('does not mutate a given state', () => {
        const existingState = {}
        const newAction = {
            type: REST_API,
            method: POST,
            status: SUCCESS,
            data: { items: [] }
        }
        deepFreeze(existingState)
        cache(existingState, newAction)
    })

    it('merges new data if schema set and status SUCCESS', () => {})

    it('deletes document from cache if method DELETE and status SUCCESS', () => {})

    it('returns existing state if schema not set and method not DELETE', () => {})

    it('returns existing state if status not SUCCESS', () => {})
})