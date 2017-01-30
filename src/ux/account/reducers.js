import { combineReducers } from 'redux'

import * as actions from '../../api/users/actions'
import initialState from './state'

const user = (state = initialState.user, action) => {
    switch(action.type) {

        case actions.GET_USER_SUCCESS:
            return {...action.user}

        case actions.GET_USER_FAILURE:
            return initialState.user

        default:
            return state
    }
}

const errors = (state = initialState.errors, action) => {
    switch(action.type) {

        case actions.GET_USER_SUCCESS:
            return initialState.errors

        case actions.GET_USER_FAILURE:
            return {...action.errors}
        
        default:
            return state
    }
}

export default combineReducers({
    user,
    errors
})