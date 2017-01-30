import * as apiInterface from './interface'

export const POST_DOCUMENT = 'POST_DOCUMENT'
export const GET_DOCUMENT = 'GET_DOCUMENT'
export const PUT_DOCUMENT = 'PUT_DOCUMENT'
export const DELETE_DOCUMENT = 'DELETE_DOCUMENT'
export const GET_COLLECTION = 'GET_COLLECTION'

export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

const createDocumentRequest = (route) => ({
    type: POST_DOCUMENT,
    status: REQUEST,
    route
})

const createDocumentSuccess = (route, data) => ({
    type: POST_DOCUMENT,
    status: SUCCESS,
    route,
    data
})

const createDocumentFailure = (route, error) => ({
    type: POST_DOCUMENT,
    status: FAILURE,
    route,
    error
})

const retrieveDocumentRequest = (route, documentId) => ({
    type: GET_DOCUMENT,
    status: REQUEST,
    route,
    documentId
})

const retrieveDocumentSuccess = (route, documentId, data) => ({
    type: GET_DOCUMENT,
    status: SUCCESS,
    route,
    data,
    documentId
})

const retrieveDocumentFailure = (route, documentId, error) => ({
    type: GET_DOCUMENT,
    status: FAILURE,
    route,
    error,
    documentId
})

const updateDocumentRequest = (route, documentId) => ({
    type: PUT_DOCUMENT,
    status: REQUEST,
    route,
    documentId
})

const updateDocumentSuccess = (route, documentId, data) => ({
    type: PUT_DOCUMENT,
    status: SUCCESS,
    route,
    data,
    documentId
})

const updateDocumentFailure = (route, documentId, error) => ({
    type: PUT_DOCUMENT,
    status: FAILURE,
    route,
    error,
    documentId
})

const deleteDocumentRequest = (route, documentId) => ({
    type: DELETE_DOCUMENT,
    status: REQUEST,
    route,
    documentId
})

const deleteDocumentSuccess = (route, documentId) => ({
    type: DELETE_DOCUMENT,
    status: SUCCESS,
    route,
    documentId
})

const deleteDocumentFailure = (route, documentId) => ({
    type: DELETE_DOCUMENT,
    status: FAILURE,
    route,
    documentId
})

const retrieveCollectionRequest = (route) => ({
    type: GET_COLLECTION,
    status: REQUEST,
    route
})

const retrieveCollectionSuccess = (route, data) => ({
    type: GET_COLLECTION,
    status: SUCCESS,
    route,
    data
})

const retrieveCollectionFailure = (route, error) => ({
    type: GET_COLLECTION,
    status: FAILURE,
    route,
    error
})

export const createDocument = (route, data, tokenKey) => {
    return (dispatch) => {
        dispatch(createDocumentRequest(route))
        return apiInterface.createDocument(route, data, tokenKey)
            .then(response => {
                if (response.ok)
                    return response.json()
                        .then(data => dispatch(
                            createDocumentSuccess(route, data)
                            )
                        )
                else
                    return response.json()
                        .then(error => dispatch(
                            createDocumentFailure(route, error)
                            )
                        )
            })
    }
}

export const retrieveDocument = (route, documentId, tokenKey) => {
    return (dispatch) => {
        dispatch(retrieveDocumentRequest(route, documentId))
        return apiInterface.retrieveDocument(route, documentId, tokenKey)
            .then(response => {
                if (response.ok)
                    return response.json()
                        .then(data => dispatch(
                            retrieveDocumentSuccess(route, documentId, data)
                            )
                        )
                else
                    return response.json()
                        .then(error => dispatch(
                            retrieveDocumentFailure(route, documentId, error)
                            )
                        )
            })
    }
}

export const updateDocument = (route, documentId, data, tokenKey) => {
    return (dispatch) => {
        dispatch(updateDocumentRequest(route, documentId))
        return apiInterface.updateDocument(route, documentId, data, tokenKey)
            .then(response => {
                if (response.ok)
                    return response.json()
                        .then(data => dispatch(
                            updateDocumentSuccess(route, documentId, data)
                            )
                        )
                else
                    return response.json()
                        .then(error => dispatch(
                            updateDocumentFailure(route, documentId, error)
                            )
                        )
            })
    }
}

export const deleteDocument = (route, documentId, tokenKey) => {
    return (dispatch) => {
        dispatch(deleteDocumentRequest(route, documentId))
        return apiInterface.deleteDocument(route, documentId, tokenKey)
            .then(response=> {
                if (response.ok)
                    return dispatch(
                        deleteDocumentSuccess(route, documentId)
                        )
                else
                    return dispatch(
                        deleteDocumentFailure(route, documentId)
                        )
            })
    }
}

export const retrieveCollection = (route, tokenKey) => {
    return (dispatch) => {
        dispatch(retrieveCollectionRequest(route))
        return apiInterface.retrieveDocument(route, tokenKey)
            .then(response => {
                if (response.ok)
                    return response.json()
                        .then(data => dispatch(
                            retrieveCollectionSuccess(route, data)
                            )
                        )
                else
                    return response.json()
                        .then(error => dispatch(
                            retrieveCollectionFailure(route, error)
                            )
                        )
            })
    }
}