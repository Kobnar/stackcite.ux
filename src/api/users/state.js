import auth from './auth/state'
import confirm from './confirm/state'

const initialState = {
    loading: false,
    auth,
    confirm
}

export default initialState