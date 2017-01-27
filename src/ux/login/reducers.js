import { combineReducers } from 'redux'

import * as authActions from '../../api/users/auth/actions'
import * as actions from './actions'
import initialState from './state'

const errors = (state = initialState.errors, action) => {
    switch(action.type) {

        case authActions.LOGIN_FAILURE:
            return {...action.errors}

        case actions.CLEAR_LOGIN_ERRORS:
            return {...initialState.errors}
        
        default:
            return state
    }
}

export default combineReducers({
    errors
})