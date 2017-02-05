import { combineReducers } from 'redux'

import { REQUEST } from 'api/actions'

import auth from './auth/reducers'
import signup from './signup/reducers'
import account from './account/reducers'

import { INIT } from './actions'

export const init = (state = true, action) => {
    if (action.type === INIT)
        if (action.status === REQUEST)
            return true
        else
            return false
    else
        return state
}

export default combineReducers({
    init,
    auth,
    signup,
    account
})