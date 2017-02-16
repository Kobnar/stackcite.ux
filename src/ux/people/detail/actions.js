import api from 'api'
import {
    GET,
    PUT,
    DELETE,
    REQUEST,
    SUCCESS } from 'api/actions'
import {
    PEOPLE } from '../actions'

export const retrieveDocument = (personId, authKey) => {
    return (dispatch) => {
        dispatch({
            type: PEOPLE,
            method: GET,
            status: REQUEST,
            documentId: personId
        })
        return dispatch(api.people.document(personId).retrieve({}, authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        ...action,
                        type: PEOPLE
                    })
                else
                    return dispatch({
                        ...action,
                        type: PEOPLE
                    })
            })
    }
}

export const updateDocument = (data, personId, authKey) => {
    return (dispatch) => {
        dispatch({
            type: PEOPLE,
            method: PUT,
            status: REQUEST,
            documentId: personId
        })
        return dispatch(api.people.document(personId).update(data, authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        ...action,
                        type: PEOPLE
                    })
                else
                    return dispatch({
                        ...action,
                        type: PEOPLE
                    })
            })
    }
}

export const deleteDocument = (personId, authKey) => {
    return (dispatch) => {
        dispatch({
            type: PEOPLE,
            method: DELETE,
            status: REQUEST,
            documentId: personId
        })
        return dispatch(api.people.document(personId).delete(authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        ...action,
                        type: PEOPLE
                    })
                else
                    return dispatch({
                        ...action,
                        type: PEOPLE
                    })
            })
    }
}