import { combineReducers } from 'redux'

import * as apiActions from '../../api/actions'
import * as userActions from '../../api/users/actions'
import * as actions from './actions'
import initialState from './state'

import confirm from './confirm/reducers'

const errors = (state = initialState.errors, action) => {
    if (action.type === userActions.POST_USER) {
        switch (action.status) {

            case apiActions.SUCCESS:
                return initialState.errors

            case apiActions.FAILURE:
                return {...action.errors}
            
            default:
                return state
        }
    } else {
        return state
    }
}

const complete = (state = initialState.complete, action) => {
    if (action.type === userActions.POST_USER
        && action.status === apiActions.SUCCESS)
        return true

    else if (action.type === actions.CLEAR_SIGNUP_FORM) 
        return false

    else
        return state
}

export default combineReducers({
    errors,
    complete,
    confirm
})