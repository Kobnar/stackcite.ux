import { combineReducers } from 'redux'

import * as userActions from '../../api/users/actions'
import * as actions from './actions'
import initialState from './state'

import confirm from './confirm/reducers'

const errors = (state = initialState.errors, action) => {
    switch(action.type) {

        case userActions.SIGNUP_FAILURE:
            return {...action.errors}

        case actions.CLEAR_SIGNUP_ERRORS:
            return {...initialState.errors}
        
        default:
            return state
    }
}

export default combineReducers({
    errors,
    confirm
})