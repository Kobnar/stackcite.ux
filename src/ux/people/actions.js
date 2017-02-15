import api from 'api'
import {
    POST,
    GET,
    PUT,
    DELETE,
    REQUEST,
    SUCCESS,
    FAILURE } from 'api/actions'

export const PEOPLE_COL = 'PEOPLE_COL'

export const createDocument = (data, authKey) => {
    return (dispatch) => {
        dispatch({
            type: PEOPLE_COL,
            method: POST,
            status: REQUEST
        })
        return dispatch(api.people.create(data, authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        type: PEOPLE_COL,
                        method: POST,
                        status: SUCCESS,
                        data: action.data
                    })
                else
                    return dispatch({
                        type: PEOPLE_COL,
                        method: POST,
                        status: FAILURE,
                        error: action.error
                    })
            })
    }
}

export const retrieveCollection = (query, authKey) => {
    return (dispatch) => {
        dispatch({
            type: PEOPLE_COL,
            method: GET,
            status: REQUEST
        })
        return dispatch(api.people.retrieve(query, authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        type: PEOPLE_COL,
                        method: GET,
                        status: SUCCESS,
                        data: action.data
                    })
                else
                    return dispatch({
                        type: PEOPLE_COL,
                        method: GET,
                        status: FAILURE,
                        error: action.error
                    })
            })
    }
}