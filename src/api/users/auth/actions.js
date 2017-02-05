import {
    REQUEST,
    SUCCESS,
    FAILURE,
    APIInterface,
    IndexResource } from 'api/actions'

// Action type
export const AUTH = 'AUTH'

// Action method
export const LOGIN = 'LOGIN'
export const TOUCH = 'TOUCH'
export const LOGOUT = 'LOGOUT'

/**
 * A custom IndexResource for handling REST API authentication requests.
 */
export class AuthResource extends IndexResource {

    create (email, password) {
        return (dispatch) => {
            dispatch({
                type: AUTH,
                method: LOGIN,
                status: REQUEST
            })
            return dispatch(APIInterface.create(this.route(), { email, password }))
                .then(action => {
                    if (action.status === SUCCESS)
                        return dispatch({
                            type: AUTH,
                            method: LOGIN,
                            status: SUCCESS,
                            data: this.mapAuthResponseData(action.data)
                        })
                    else
                        return dispatch({
                            type: AUTH,
                            method: LOGIN,
                            status: FAILURE,
                            error: action.error
                        })
                })
        }
    }

    update (authKey) {
        return (dispatch) => {
            dispatch({
                type: AUTH,
                method: TOUCH,
                status: REQUEST
            })
            return dispatch(APIInterface.update(this.route(), undefined, authKey))
                .then(action => {
                    if (action.status === SUCCESS)
                        return dispatch({
                            type: AUTH,
                            method: TOUCH,
                            status: SUCCESS,
                            data: this.mapAuthResponseData(action.data)
                        })
                    else
                        return dispatch({
                            type: AUTH,
                            method: TOUCH,
                            status: FAILURE,
                            error: action.error
                        })
                })
        }
    }

    delete (authKey) {
        return (dispatch) => {
            dispatch({
                type: AUTH,
                method: LOGOUT,
                status: REQUEST
            })
            return dispatch(APIInterface.delete(this.route(), undefined, authKey))
                .then(action => {
                    if (action.status === SUCCESS)
                        return dispatch({
                            type: AUTH,
                            method: LOGOUT,
                            status: SUCCESS
                        })
                    else
                        return dispatch({
                            type: AUTH,
                            method: LOGOUT,
                            status: FAILURE,
                            error: action.error
                        })
                })
        }
    }

    mapAuthResponseData = (data) => ({
        user: {
            id: data.user.id,
            groups: data.user.groups
        },
        token: {
            key: data.key,
            issued: data.issued,
            touched: data.touched
        }
    })
}