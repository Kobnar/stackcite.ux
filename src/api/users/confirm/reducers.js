import { combineReducers } from 'redux'

import { REQUEST, SUCCESS } from '../../actions'
import {
    POST_CONFIRM_TOKEN,
    PUT_CONFIRM_TOKEN } from './actions'

import initialState from './state'

const loading = (state = initialState.loading, action) => {
    switch(action.type) {

        case POST_CONFIRM_TOKEN:
        case PUT_CONFIRM_TOKEN:
            if (action.status === REQUEST)
                return true
            else
                return initialState.loading
        default:
            return state
    }
}

export default combineReducers({
    loading
})