import auth from './auth/state'
import conf from './conf/state'

const initialState = {
    loading: false,
    auth,
    conf
}

export default initialState