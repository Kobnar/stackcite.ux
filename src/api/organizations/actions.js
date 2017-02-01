import Endpoint, { API_URI } from '../actions'

import * as schema from './schema'

export const POST_ORG = 'POST_ORGANIZATION'
export const GET_ORG = 'GET_ORGANIZATION'
export const PUT_ORG = 'PUT_ORGANIZATION'
export const DELETE_ORG = 'DELETE_ORGANIZATION'
export const GET_ORGS = 'GET_ORGANIZATIONS'

class Organization extends Endpoint {

    route = API_URI + 'organizations/'

    SCHEMA = schema.organization

    actionTypes = {
        create: POST_ORG,
        retrieve: GET_ORG,
        update: PUT_ORG,
        delete: DELETE_ORG,
        retrieveCollection: GET_ORGS
    }

    mapResponseError (error) {
        if (error.code === 409)
            error.detail['email'] = ['This organization is already exists.']
        return error.detail
    }
}

const orgsEndpoint = new Organization()

export default orgsEndpoint