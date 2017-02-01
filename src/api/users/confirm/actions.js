import Endpoint, { API_URI } from '../../actions'

export const POST_CONFIRM_TOKEN = 'POST_CONFIRM_TOKEN'
export const PUT_CONFIRM_TOKEN = 'PUT_CONFIRM_TOKEN'

class Confirm extends Endpoint {

    route = API_URI + 'users/conf/'

    actionTypes = {
        create: POST_CONFIRM_TOKEN,
        update: PUT_CONFIRM_TOKEN
    }

    create (email) {
        return super.create({ email })
    }

    retrieve () {}

    update (key) {
        return super.update(undefined, { key })
    }

    delete () {}

}

const confirmEndpoint = new Confirm()

export default confirmEndpoint