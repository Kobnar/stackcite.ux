import { combineReducers } from 'redux'

import initialState from './state'
import * as actions from './actions'

const loading = (state = initialState.loading, action) => {
    switch(action.type) {

        case actions.CREATE_CONFIRM_TOKEN_REQUEST:
            return true
        
        case actions.CREATE_CONFIRM_TOKEN_SUCCESS:
        case actions.CREATE_CONFIRM_TOKEN_FAILURE:
            return false
        
        default:
            return state
    }
}

export default combineReducers({
    loading
})