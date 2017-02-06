import api from 'api'
import {
    POST,
    GET,
    PUT,
    DELETE,
    REQUEST,
    SUCCESS,
    FAILURE } from 'api/actions'

export const SOURCE_COL = 'SOURCE_COL'

export const SOURCE = 'SOURCE'
export const TEXT = 'TEXT'
export const BOOK = 'BOOK'
export const SOURCE_TYPES = [BOOK]

const sourceRoutes = {
    [SOURCE]: api.sources,
    [TEXT]: api.sources.text,
    [BOOK]: api.sources.text.books
}

export const createSource = (data, type, authKey) => {
    var endpoint = sourceRoutes[type]
    return (dispatch) => {
        dispatch({
            type: SOURCE_COL,
            method: POST,
            status: REQUEST
        })
        return dispatch(endpoint.create(data, authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        type: SOURCE_COL,
                        method: POST,
                        status: SUCCESS,
                        data: action.data
                    })
                else
                    return dispatch({
                        type: SOURCE_COL,
                        method: POST,
                        status: FAILURE,
                        error: action.error
                    })
            })
    }
}

export const retrieveSourceCollection = (query, type, authKey) => {
    var endpoint = sourceRoutes[type]
    return (dispatch) => {
        dispatch({
            type: SOURCE_COL,
            method: GET,
            status: REQUEST
        })
        return dispatch(endpoint.retrieve(query, authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        type: SOURCE_COL,
                        method: GET,
                        status: SUCCESS,
                        data: action.data
                    })
                else
                    return dispatch({
                        type: SOURCE_COL,
                        method: GET,
                        status: FAILURE,
                        error: action.error
                    })
            })
    }
}