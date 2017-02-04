import { SUCCESS, FAILURE } from '../../../api/actions'
import { AUTH, LOGIN, TOUCH, LOGOUT } from './actions'
import initialState from './state'

export const auth = (state=initialState.auth, action) => {
    if (action.type === AUTH)
        if (action.status === FAILURE || action.method == LOGOUT)
            return initialState.auth
        else if (action.status === SUCCESS)
            return { ...action.data }
    return state
}