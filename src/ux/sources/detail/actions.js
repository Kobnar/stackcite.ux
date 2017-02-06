import api from 'api'
import {
    POST,
    GET,
    PUT,
    DELETE,
    REQUEST,
    SUCCESS,
    FAILURE } from 'api/actions'

export const SOURCE_DOC = 'SOURCE_DOC'

export const retrieveSource = (sourceId, type, authKey) => {
    return (dispatch) => {
        dispatch({
            type: SOURCE_DOC,
            method: GET,
            status: REQUEST
        })
        return dispatch(api.sources.document(sourceId).retrieve({}, authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        type: SOURCE_DOC,
                        method: GET,
                        status: SUCCESS,
                        data: action.data
                    })
                else
                    return dispatch({
                        type: SOURCE_DOC,
                        method: GET,
                        status: FAILURE,
                        error: action.error
                    })
            })
    }
}

export const updateSource = (data, sourceId, type, authKey) => {
    return (dispatch) => {
        dispatch({
            type: SOURCE_DOC,
            method: PUT,
            status: REQUEST
        })
        return dispatch(api.sources.document(sourceId).update(data, authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        type: SOURCE_DOC,
                        method: PUT,
                        status: SUCCESS,
                        data: action.data
                    })
                else
                    return dispatch({
                        type: SOURCE_DOC,
                        method: PUT,
                        status: FAILURE,
                        error: action.error
                    })
            })
    }
}

export const deleteSource = (sourceId, type, authKey) => {
    return (dispatch) => {
        dispatch({
            type: SOURCE_DOC,
            method: DELETE,
            status: REQUEST
        })
        return dispatch(api.sources.document(sourceId).delete(authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        type: SOURCE_DOC,
                        method: DELETE,
                        status: SUCCESS
                    })
                else
                    return dispatch({
                        type: SOURCE_DOC,
                        method: DELETE,
                        status: FAILURE,
                        error: action.error
                    })
            })
    }
}