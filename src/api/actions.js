import REST, { ROOT_URI } from './rest'

const API_VERSION = 'v0'
export const API_URI = ROOT_URI + API_VERSION + '/'

export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

export const POST_DOCUMENT = 'POST_DOCUMENT'
export const GET_DOCUMENT = 'GET_DOCUMENT'
export const PUT_DOCUMENT = 'PUT_DOCUMENT'
export const DELETE_DOCUMENT = 'DELETE_DOCUMENT'
export const GET_COLLECTION = 'GET_COLLECTION'

/**
 * A base class for managing API endpoint actions.
 */
export default class Endpoint extends REST {

    route = API_URI

    SCHEMA = undefined

    actionTypes = {
        create: POST_DOCUMENT,
        retrieve: GET_DOCUMENT,
        update: PUT_DOCUMENT,
        delete: DELETE_DOCUMENT,
        retrieveCollection: GET_COLLECTION
    }

    mapResponseData (data) { return data }
    mapResponseError (error) { return error.detail }

    create (data, tokenKey) {
        return (dispatch) => {
            dispatch({
                type: this.actionTypes.create,
                status: REQUEST
            })
            return this.POST(data, tokenKey)
                .then(response => {
                    if (response.ok)
                        return response.json()
                            .then(data => dispatch({
                                type: this.actionTypes.create,
                                status: SUCCESS,
                                data: this.mapResponseData(data),
                                schema: this.SCHEMA
                            })
                        )
                    else
                        return response.json()
                            .then(error => dispatch({
                                type: this.actionTypes.create,
                                status: FAILURE,
                                errors: this.mapResponseError(error)
                            })
                        )
                })
        }
    }

    retrieve (documentId, tokenKey) {
        return (dispatch) => {
            dispatch({
                type: this.actionTypes.retrieve,
                status: REQUEST,
                documentId
            })
            return this.GET(documentId, tokenKey)
                .then(response => {
                    if (response.ok)
                        return response.json()
                            .then(data => dispatch({
                                type: this.actionTypes.retrieve,
                                status: SUCCESS,
                                documentId,
                                data: this.mapResponseData(data),
                                schema: this.SCHEMA
                            })
                        )
                    else
                        return response.json()
                            .then(error => dispatch({
                                type: this.actionTypes.retrieve,
                                status: FAILURE,
                                documentId,
                                errors: this.mapResponseError(error)
                            })
                        )
                })
        }
    }

    update (documentId, data, tokenKey) {
        return (dispatch) => {
            dispatch({
                type: this.actionTypes.update,
                status: REQUEST,
                documentId
            })
            return this.PUT(documentId, data, tokenKey)
                .then(response => {
                    if (response.ok)
                        return response.json()
                            .then(data => dispatch({
                                type: this.actionTypes.update,
                                status: SUCCESS,
                                documentId,
                                data: this.mapResponseData(data),
                                schema: this.SCHEMA
                                })
                            )
                    else
                        return response.json()
                            .then(error => dispatch({
                                type: this.actionTypes.update,
                                status: FAILURE,
                                documentId,
                                errors: this.mapResponseError(error)
                                })
                            )
                })
        }
    }

    delete (documentId, tokenKey) {
        return (dispatch) => {
            dispatch({
                type: this.actionTypes.delete,
                status: REQUEST,
                documentId
            })
            return this.DELETE(documentId, tokenKey)
                .then(response=> {
                    if (response.ok)
                        return dispatch({
                            type: this.actionTypes.delete,
                            status: SUCCESS,
                            documentId
                        })
                    else
                        return dispatch({
                            type: this.actionTypes.delete,
                            status: FAILURE,
                            documentId
                        })
                })
        }
    }

    retrieveCollection (tokenKey) {
        return (dispatch) => {
            dispatch({
                type: this.actionTypes.retrieveCollection,
                status: REQUEST
            })
            return this.GET_ALL(tokenKey)
                .then(response => {
                    if (response.ok)
                        return response.json()
                            .then(data => dispatch({
                                type: this.actionTypes.retrieveCollection,
                                status: SUCCESS,
                                data, // TODO: Hook for collection data mapping
                                schema: this.SCHEMA
                            })
                        )
                    else
                        return response.json()
                            .then(error => dispatch({
                                type: this.actionTypes.retrieveCollection,
                                status: SUCCESS,
                                errors: this.mapResponseError(error)
                            })
                        )
                })
        }
    }
}