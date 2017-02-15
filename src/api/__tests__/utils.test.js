import deepFreeze from 'deep-freeze'

import { updateCache, deleteDocument } from '../utils'

describe('updateCache', () => {

    it('does not modify existing cache', () => {
        const cache = {
            sources: { '58982f1930f193383f952a47': { id: '58982f1930f193383f952a47' }},
            people: { '58982f1930f193383f952a4f': { id: '58982f1930f193383f952a4f' }}}
        const update = {
            people: { '5898336130f1933caf7045b4': { id: '5898336130f1933caf7045b4' }}}
        deepFreeze(cache)
        updateCache(cache, update)
    })

    it('Updates cache with new data', () => {
        const cache = {
            sources: {
                '58982f1930f193383f952a47': { id: '58982f1930f193383f952a47' },
                '5898313830f1933b18476eb7': { id: '5898313830f1933b18476eb7' }},
            people: {
                '58982f1930f193383f952a4b': { id: '58982f1930f193383f952a4b' },
                '58982f1930f193383f952a4f': { id: '58982f1930f193383f952a4f' }}}
        const update = {
            people: {
                '5898336130f1933caf7045bd': { id: '5898336130f1933caf7045bd' },
                '5898336130f1933caf7045bc': { id: '5898336130f1933caf7045bc' }}}
        const expected = {
            sources: {
                '58982f1930f193383f952a47': { id: '58982f1930f193383f952a47' },
                '5898313830f1933b18476eb7': { id: '5898313830f1933b18476eb7' }},
            people: {
                '58982f1930f193383f952a4b': { id: '58982f1930f193383f952a4b' },
                '58982f1930f193383f952a4f': { id: '58982f1930f193383f952a4f' },
                '5898336130f1933caf7045bd': { id: '5898336130f1933caf7045bd' },
                '5898336130f1933caf7045bc': { id: '5898336130f1933caf7045bc' }}}
        const result = updateCache(cache, update)
        expect(result).toEqual(expected)
    })
})

describe('deleteDocument', () => {

    it('does not modify existing cache', () => {
        const cache = {
            sources: { '58982f1930f193383f952a47': { id: '58982f1930f193383f952a47' }},
            people: { '58982f1930f193383f952a4f': { id: '58982f1930f193383f952a4f' }}}
        deepFreeze(cache)
        deleteDocument(cache, '58982f1930f193383f952a47')
    })

    it('removes document from cache', () => {
        const cache = {
            sources: {
                '58982f1930f193383f952a47': { id: '58982f1930f193383f952a47' },
                '5898313830f1933b18476eb7': { id: '5898313830f1933b18476eb7' }},
            people: {
                '58982f1930f193383f952a4b': { id: '58982f1930f193383f952a4b' },
                '58982f1930f193383f952a4f': { id: '58982f1930f193383f952a4f' }}}
        const expected = {
            sources: {
                '58982f1930f193383f952a47': { id: '58982f1930f193383f952a47' },
                '5898313830f1933b18476eb7': { id: '5898313830f1933b18476eb7' }},
            people: {
                '58982f1930f193383f952a4b': { id: '58982f1930f193383f952a4b' }}}
        const result = deleteDocument(cache, '58982f1930f193383f952a4f')
        expect(result).toEqual(expected)
    })

    it('does nothing if document not found', () => {
        const cache = {
            sources: {
                '58982f1930f193383f952a47': { id: '58982f1930f193383f952a47' },
                '5898313830f1933b18476eb7': { id: '5898313830f1933b18476eb7' }},
            people: {
                '58982f1930f193383f952a4b': { id: '58982f1930f193383f952a4b' },
                '58982f1930f193383f952a4f': { id: '58982f1930f193383f952a4f' }}}
        const result = deleteDocument(cache, '14282f1930f193383f952g5a')
        expect(result).toEqual(cache)
    })
})