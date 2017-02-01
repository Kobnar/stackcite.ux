import Endpoint, { API_URI } from '../actions'

import * as schema from './schema'

export const POST_PERSON = 'POST_PERSON'
export const GET_PERSON = 'GET_PERSON'
export const PUT_PERSON = 'PUT_PERSON'
export const DELETE_PERSON = 'DELETE_PERSON'
export const GET_PEOPLE = 'GET_PEOPLE'

class Sources extends Endpoint {

    route = API_URI + 'people/'

    SCHEMA = schema.person

    actionTypes = {
        create: POST_PERSON,
        retrieve: GET_PERSON,
        update: PUT_PERSON,
        delete: DELETE_PERSON,
        retrieveCollection: GET_PEOPLE
    }
}