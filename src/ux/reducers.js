import { combineReducers } from 'redux'

import { REQUEST } from 'api/actions'

import people from './people/reducers'
import sources from './sources/reducers'
import login from './login/reducers'
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
    people,
    sources,
    login,
    signup,
    account
})