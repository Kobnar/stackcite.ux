import { combineReducers } from 'redux'

import * as confirmActions from '../../../api/users/confirm/actions'
import * as actions from './actions'
import initialState from './state'

const failed = (state = initialState.failed, action) => {
    switch(action.type) {

        case confirmActions.CONFIRM_ACCOUNT_SUCCESS:
            return initialState.failed

        case confirmActions.CONFIRM_ACCOUNT_FAILURE:
            return true
        
        default:
            return state
    }
}

export default combineReducers({
    failed
})