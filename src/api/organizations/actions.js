import {
    REQUEST,
    SUCCESS,
    FAILURE,
    createDocument,
    retrieveDocument,
    updateDocument,
    deleteDocument,
    retrieveCollection } from '../actions'

import { organization as orgSchema } from './schema'

const ROUTE = 'organizations/'

export const POST_ORG = 'POST_ORGANIZATION'
export const GET_ORG = 'GET_ORGANIZATION'
export const PUT_ORG = 'PUT_ORGANIZATION'
export const DELETE_ORG = 'DELETE_ORGANIZATION'
export const GET_ORGS = 'GET_ORGANIZATIONS'

const createOrgRequest = () => ({
    type: POST_ORG,
    status: REQUEST
})

const createOrgSuccess = (data) => ({
    type: POST_ORG,
    status: SUCCESS,
    org: data
})

const createOrgFailure = (error) => {
    var action = {
        type: POST_ORG,
        status: FAILURE,
        errors: error.detail
    }
    if (error.code === 409)
        action.errors["name"] = ["This organization already exists."]
    return action
}

const retrieveOrgRequest = (orgId) => ({
    type: GET_ORG,
    status: REQUEST,
    orgId
})

const retrieveOrgSuccess = (orgId, data) => ({
    type: GET_ORG,
    status: SUCCESS,
    org: data,
    orgId
})

const retrieveOrgFailure = (orgId, error) => ({
    type: GET_ORG,
    status: FAILURE,
    errors: error.detail,
    orgId
})

const updateOrgRequest = (orgId) => ({
    type: PUT_ORG,
    status: REQUEST,
    orgId
})

const updateOrgSuccess = (orgId, data) => ({
    type: PUT_ORG,
    status: SUCCESS,
    org: data,
    orgId
})

const updateOrgFailure = (orgId, error) => ({
    type: PUT_ORG,
    status: FAILURE,
    errors: error.detail,
    orgId
})

const deleteOrgRequest = (orgId) => ({
    type: DELETE_ORG,
    status: REQUEST,
    orgId
})

const deleteOrgSuccess = (orgId) => ({
    type: DELETE_ORG,
    status: SUCCESS,
    orgId
})

const deleteOrgFailure = (orgId) => ({
    type: DELETE_ORG,
    status: FAILURE,
    orgId
})

const retrieveOrgsRequest = (route) => ({
    type: GET_ORGS,
    status: REQUEST,
})

const retrieveOrgsSuccess = (data) => ({
    type: GET_ORGS,
    status: SUCCESS,
    orgs: data
})

const retrieveOrgsFailure = (error) => ({
    type: GET_ORGS,
    status: FAILURE,
    errors: error.detail
})

export const createOrg = (data, tokenKey) => {
    return (dispatch) => {
        dispatch(createOrgRequest())
        return dispatch(createDocument(ROUTE, data, tokenKey, orgSchema))
            .then(action => {
                if (action.status === SUCCESS)
                    dispatch(createOrgSuccess(action.data))
                else
                    dispatch(createOrgFailure(action.error))
            })
    }
}

export const retrieveOrg = (tokenKey, orgId) => {
    return (dispatch) => {
        dispatch(retrieveOrgRequest())
        return dispatch(retrieveDocument(ROUTE, orgId, tokenKey, orgSchema))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch(retrieveOrgSuccess(orgId, action.data))
                else
                    return dispatch(retrieveOrgFailure(orgId, action.error))
            })
    }
}

export const updateOrg = (tokenKey, orgId, data) => {
    return (dispatch) => {
        dispatch(updateOrgRequest())
        return dispatch(updateDocument(ROUTE, orgId, data, tokenKey, orgSchema))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch(updateOrgSuccess(orgId, action.data))
                else
                    return dispatch(updateOrgFailure(orgId, action.error))
            })
    }
}

export const deleteOrg = (tokenKey, orgId) => {
    return (dispatch) => {
        dispatch(deleteOrgRequest())
        return dispatch(deleteDocument(ROUTE, orgId, tokenKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch(deleteOrgSuccess(orgId))
                else
                    return dispatch(deleteOrgFailure(orgId))
            })
    }
}

export const retrieveOrgs = (tokenKey) => {
    return (dispatch) => {
        dispatch(retrieveOrgsRequest())
        return dispatch(retrieveCollection(ROUTE, tokenKey, orgSchema))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch(retrieveOrgsSuccess(action.data))
                else
                    return dispatch(retrieveOrgsFailure(action.error))
            })
    }
}