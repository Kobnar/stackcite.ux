import Endpoint, { API_URI, SUCCESS } from '../../actions'

export const POST_AUTH_TOKEN = 'POST_AUTH_TOKEN'
export const GET_AUTH_TOKEN = 'GET_AUTH_TOKEN'
export const PUT_AUTH_TOKEN = 'PUT_AUTH_TOKEN'
export const DELETE_AUTH_TOKEN = 'DELETE_AUTH_TOKEN'

class Auth extends Endpoint {

    route = API_URI + 'users/auth/'

    actionTypes = {
        create: POST_AUTH_TOKEN,
        retrieve: GET_AUTH_TOKEN,
        update: PUT_AUTH_TOKEN,
        delete: DELETE_AUTH_TOKEN
    }

    mapResponseData (data) {
        return {
            user: {
                id: data.user.id,
                groups: data.user.groups
            },
            token: {
                key: data.key,
                issued: data.issued,
                touched: data.touched
            }
        }
    }

    mapResponseError (error) {
        return { auth: ['Authentication failed.'] }
    }

    create (email, password) {
        return super.create({ email, password })
    }

    retrieve (tokenKey) {
        return super.create(undefined, tokenKey)
    }

    update (tokenKey) {
        return super.update(undefined, undefined, tokenKey)
    }

    delete (tokenKey) {
        return super.delete(undefined, tokenKey)
    }

    retrieveCollection () {}

}

const authEndpoint = new Auth()

export default authEndpoint