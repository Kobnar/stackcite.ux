import { combineReducers } from 'redux'

import auth from './auth/reducers'
import conf from './conf/reducers'

export default combineReducers({
    auth,
    conf
})