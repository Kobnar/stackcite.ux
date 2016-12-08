import { combineReducers } from 'redux'
import { LOCATION_CHANGE } from 'react-router-redux'

import auth from './auth/reducers'
import initialState from './state'
import * as actions from './actions'

const ux = (state = initialState.ux, action) => {
    switch(action.type) {
        case actions.TOGGLE_MOBILE_NAV_MENU:
            return {
                ...state,
                mobileNavMenuVisible: !state.mobileNavMenuVisible
            }
        case actions.SHOW_MOBILE_NAV_MENU:
            return {
                ...state,
                mobileNavMenuVisible: true
            }
        case LOCATION_CHANGE:
        case actions.HIDE_MOBILE_NAV_MENU:
            return {
                ...state,
                mobileNavMenuVisible: false
            }
        default:
            return state
    }
}

export default combineReducers({
    auth,
    ux
})