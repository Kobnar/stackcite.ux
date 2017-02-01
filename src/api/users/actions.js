import Endpoint, { API_URI } from '../actions'

import * as schema from './schema'

export const POST_USER = 'POST_USER'
export const GET_USER = 'GET_USER'
export const PUT_USER = 'PUT_USER'
export const DELETE_USER = 'DELETE_USER'
export const GET_USERS = 'GET_USERS'

class Users extends Endpoint {

    route = API_URI + 'users/'

    SCHEMA = schema.user

    actionTypes = {
        create: POST_USER,
        retrieve: GET_USER,
        update: PUT_USER,
        delete: DELETE_USER,
        retrieveCollection: GET_USERS
    }

    mapResponseError (error) {
        if (error.code === 409)
            error.detail['email'] = ['This email is already registered.']
        return error.detail
    }

    create (email, password) {
        return super.create({email, password})
    }

}

const usersEndpoint = new Users()

export default usersEndpoint