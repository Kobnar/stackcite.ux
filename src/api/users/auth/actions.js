import fetch from 'isomorphic-fetch'

// TODO: Abstract general endpoint URI
const authEndpoint = 'http://api.localhost/v0/users/auth/'

// Maps API response from /v0/auth/ to the standard dispatch action pattern
const mapAuthApiResponseToAction = (response) => ({
    user: response.user,
    token: {
        key: response.key,
        issued: response.issued,
        touched: response.touched
    }
})

const authFailedMsg = { auth: ['Authentication failed.'] }

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
const loginRequest = () => ({ type: LOGIN_REQUEST  })

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const loginSuccess = (response) => ({
        type: LOGIN_SUCCESS,
        ...mapAuthApiResponseToAction(response)
})

export const LOGIN_FAILURE = 'LOGIN_FAILURE'
const loginFailure = (error) => ({
        type: LOGIN_FAILURE,
        errors: authFailedMsg
})

export const TOUCH_TOKEN_REQUEST = 'TOUCH_TOKEN_REQUEST'
const touchTokenRequest = () => ({ type: TOUCH_TOKEN_REQUEST })

export const TOUCH_TOKEN_SUCCESS = 'TOUCH_TOKEN_SUCCESS'
const touchTokenSuccess = (response) => ({
        type: TOUCH_TOKEN_SUCCESS,
        ...mapAuthApiResponseToAction(response)
})

export const TOUCH_TOKEN_FAILURE = 'TOUCH_TOKEN_FAILURE'
const touchTokenFailure = (error) => ({
        type: TOUCH_TOKEN_FAILURE,
        errors: authFailedMsg
})

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
const logoutRequest = () => ({ type: LOGOUT_REQUEST })

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const logoutSuccess = () => ({ type: LOGOUT_SUCCESS })

export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
const logoutFailure = () => ({ type: LOGOUT_FAILURE })

export const login = (email, password) => {
    return (dispatch) => {
        dispatch(loginRequest());
        return fetch(authEndpoint, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ email, password })
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                        .then(data => dispatch(loginSuccess(data)))
                } else {
                    return response.json()
                        .then(error => dispatch(loginFailure(error)))
                }
            })
    }
}

export const touchToken = (apiToken) => {
    return (dispatch) => {
        dispatch(touchTokenRequest())
        return fetch(authEndpoint, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'key '.concat(apiToken)
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                        .then(data => dispatch(touchTokenSuccess(data)))
                } else {
                    return response.json()
                        .then(error => dispatch(touchTokenFailure(error)))
                }
            })
    }
}

export const logout = (apiToken) => {
    return (dispatch) => {
        dispatch(logoutRequest())
        return fetch(authEndpoint, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'key '.concat(apiToken)
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                        .then(data => dispatch(logoutSuccess(data)))
                } else {
                    return response.json()
                        .then(error => dispatch(logoutFailure(error)))
                }
            })
    }
}