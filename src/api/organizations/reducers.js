import { combineReducers } from 'redux'

import { REQUEST } from '../actions'
import {
    POST_ORG,
    GET_ORG,
    PUT_ORG,
    DELETE_ORG,
    GET_ORGS } from './actions'

import initialState from './state'

const loading = (state = initialState.loading, action) => {
    switch (action.type) {

        case POST_ORG:
        case GET_ORG:
        case PUT_ORG:
        case DELETE_ORG:
        case GET_ORGS:
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