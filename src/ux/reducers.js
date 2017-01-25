import { combineReducers } from 'redux'
import { LOCATION_CHANGE } from 'react-router-redux'

import login from './login/reducers'
import signup from './signup/reducers'

import * as actions from './actions'
import initialState from './state'

const mobileNavMenuVisible = (state = initialState.mobileNavMenuVisible, action) => {
    switch(action.type) {

        case actions.SHOW_MOBILE_NAV_MENU:
            return true

        case actions.HIDE_MOBILE_NAV_MENU:
        case LOCATION_CHANGE:
            return false

        case actions.TOGGLE_MOBILE_NAV_MENU:
            return !state
        
        default:
            return state
    }
}

export default combineReducers({
    mobileNavMenuVisible,
    login,
    signup
})