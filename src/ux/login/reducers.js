import { combineReducers } from 'redux'

import * as actions from '../../api/users/auth/actions'
import initialState from './state'

const errors = (state = initialState.errors, action) => {
    switch(action.type) {

        case actions.LOGIN_FAILURE:
            return {...action.errors}
        
        default:
            return state
    }
}

export default combineReducers({
    errors
})