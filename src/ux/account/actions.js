import { GET, REQUEST, SUCCESS, FAILURE } from '../../api/actions'
import api from '../../api'

export const ACCOUNT = 'ACCOUNT'

export const retrieve = (userId, authKey) => {
    return (dispatch) => {
        dispatch({
            type: ACCOUNT,
            method: GET,
            status: REQUEST
        })
        return dispatch(api.users.document(userId).retrieve({}, authKey))
            .then(action => {
                if (action.status === SUCCESS)
                    return dispatch({
                        type: ACCOUNT,
                        method: GET,
                        status: SUCCESS,
                        data: action.data
                    })
                else
                    return dispatch({
                        type: ACCOUNT,
                        method: GET,
                        status: FAILURE,
                        error: action.error
                    })
            })
    }
}