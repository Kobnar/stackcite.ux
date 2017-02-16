import api from 'api'
import {
    POST,
    GET,
    REQUEST,
    SUCCESS } from 'api/actions'

export const PEOPLE = 'PEOPLE'

export const createDocument = (data, authKey) => {
    return (dispatch) => {
        dispatch({
            type: PEOPLE,
            method: POST,
            status: REQUEST
        })
        return dispatch(api.people.create(data, authKey))
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

export const retrieveCollection = (query, authKey) => {
    return (dispatch) => {
        dispatch({
            type: PEOPLE,
            method: GET,
            status: REQUEST
        })
        return dispatch(api.people.retrieve(query, authKey))
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