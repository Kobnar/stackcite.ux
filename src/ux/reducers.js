import { combineReducers } from 'redux'

import * as actions from './actions'
import initialState from './state'

const mobileNavMenuVisible = (state = initialState.mobileNavMenuVisible, action) => {
    switch(action.type) {

        case actions.SHOW_MOBILE_NAV_MENU:
            return true

        case actions.HIDE_MOBILE_NAV_MENU:
            return false

        case actions.TOGGLE_MOBILE_NAV_MENU:
            return !state
        
        default:
            return state
    }
}

export default combineReducers({
    mobileNavMenuVisible
})