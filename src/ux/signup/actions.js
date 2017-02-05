import { REQUEST, SUCCESS, FAILURE } from 'api/actions'
import api from 'api'

export const SIGNUP = 'SIGNUP'

export const signup = (email, password) => {
    return (dispatch) => {
        dispatch({
            type: SIGNUP,
            status: REQUEST
        })
        return dispatch(api.users.create({ email, password }))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        type: SIGNUP,
                        status: SUCCESS,
                        data: action.data
                    })
                else
                    return dispatch({
                        type: SIGNUP,
                        status: FAILURE,
                        error: action.error
                    })
            })
    }
}