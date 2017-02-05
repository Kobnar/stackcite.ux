import { combineReducers } from 'redux'
import { SUCCESS, FAILURE } from 'api/actions'
import { AUTH, LOGOUT } from './actions'

const catchAuthResponse = (state, action, key) => {
    if (action.type === AUTH)
        if (action.status === FAILURE || action.method === LOGOUT)
            return { [key]: {} }
        else if (action.status === SUCCESS)
            return { ...action.data[key] }
    return state
}

export const user = (state = {}, action) => {
    return catchAuthResponse(state, action, 'user')
}

export const token = (state = {}, action) => {
    return catchAuthResponse(state, action, 'token')
}

export default combineReducers({
    user,
    token
})