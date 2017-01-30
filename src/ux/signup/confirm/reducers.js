import { combineReducers } from 'redux'

import { SUCCESS } from '../../../api/actions'
import { PUT_CONFIRM_TOKEN } from '../../../api/users/confirm/actions'

import initialState from './state'

const failed = (state = initialState.failed, action) => {
    switch(action.type) {

        case PUT_CONFIRM_TOKEN:
            if (action.status === SUCCESS)
                return initialState.failed
            else
                return true

        default:
            return state
    }
}

export default combineReducers({
    failed
})