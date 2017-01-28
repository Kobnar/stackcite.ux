import { combineReducers } from 'redux'

import initialState from './state'
import * as actions from './actions'

import auth from './auth/reducers'
import confirm from './confirm/reducers'

const loading = (state = initialState.loading, action) => {
    switch(action.type) {
        
        case actions.SIGNUP_REQUEST:
            return true
        
        case actions.SIGNUP_SUCCESS:
        case actions.SIGNUP_FAILURE:
            return false

        default:
            return state
    }
}

export default combineReducers({
    loading,
    auth,
    confirm
})