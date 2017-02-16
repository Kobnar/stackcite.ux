import api from 'api'
import {
    POST,
    GET,
    PUT,
    DELETE,
    REQUEST,
    SUCCESS,
    FAILURE } from 'api/actions'

export const PEOPLE_DOC = 'PEOPLE_DOC'

export const retrieveDocument = (personId, authKey) => {
    return (dispatch) => {
        dispatch({
            type: PEOPLE_DOC,
            method: GET,
            status: REQUEST
        })
        return dispatch(api.people.document(personId).retrieve({}, authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        type: PEOPLE_DOC,
                        method: GET,
                        status: SUCCESS,
                        data: action.data
                    })
                else
                    return dispatch({
                        type: PEOPLE_DOC,
                        method: GET,
                        status: FAILURE,
                        error: action.error
                    })
            })
    }
}

export const updateDocument = (data, personId, authKey) => {
    return (dispatch) => {
        dispatch({
            type: PEOPLE_DOC,
            method: PUT,
            status: REQUEST
        })
        return dispatch(api.people.document(personId).update(data, authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        type: PEOPLE_DOC,
                        method: PUT,
                        status: SUCCESS,
                        data: action.data
                    })
                else
                    return dispatch({
                        type: PEOPLE_DOC,
                        method: PUT,
                        status: FAILURE,
                        error: action.error
                    })
            })
    }
}

export const deleteDocument = (personId, authKey) => {
    return (dispatch) => {
        dispatch({
            type: PEOPLE_DOC,
            method: DELETE,
            status: REQUEST
        })
        return dispatch(api.people.document(personId).delete(authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        type: PEOPLE_DOC,
                        method: DELETE,
                        status: SUCCESS
                    })
                else
                    return dispatch({
                        type: PEOPLE_DOC,
                        method: DELETE,
                        status: FAILURE,
                        error: action.error
                    })
            })
    }
}