import { combineReducers } from 'redux'
import { LOCATION_CHANGE } from 'react-router-redux'

import { REQUEST } from 'api/actions'

import people from './people/reducers'
import sources from './sources/reducers'
import login from './login/reducers'
import signup from './signup/reducers'
import account from './account/reducers'

import { INIT, HIDE_NAV, TOGGLE_NAV } from './actions'

export const init = (state = true, action) => {
    if (action.type === INIT)
        if (action.status === REQUEST)
            return true
        else
            return false
    else
        return state
}

export const navHidden = (state = true, action) => {
    switch (action.type) {
        case HIDE_NAV:
        case LOCATION_CHANGE:
            return true
        
        case TOGGLE_NAV:
            return !state
        
        default:
            return true
    }
}

export default combineReducers({
    init,
    navHidden,
    people,
    sources,
    login,
    signup,
    account
})