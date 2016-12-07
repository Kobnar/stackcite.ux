import fetch from 'isomorphic-fetch';

const authEndpoint = 'http://api.localhost/v0/auth/'

// Maps API response from /v0/auth/ to the standard dispatch action pattern
const mapAuthApiResponseToAction = (response) => ({
    user: response.user,
    token: {
        key: response.key,
        issued: response.issued,
        touched: response.touched
    }
})

// Maps an API error from /v0/auth/ to the standard dispach action pattern
const mapAuthApiErrorToAction = (error) => ({
    status: error.response.status,
    text: error.response.statusText
})

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
const loginRequest = () => {
    return { type: LOGIN_REQUEST }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const loginSuccess = (response) => {
    return {
        type: LOGIN_SUCCESS,
        ...mapAuthApiResponseToAction(response)
    }
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE'
const loginFailure = (error) => {
    return {
        type: LOGIN_FAILURE,
        ...mapAuthApiErrorToAction(error)
    }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
const logoutRequest = () => {
    return { type: LOGOUT_REQUEST }
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const logoutSuccess = () => {
    return { type: LOGOUT_SUCCESS }
}

export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
const logoutFailure = (error) => {
    return {
        type: LOGOUT_FAILURE,
        ...mapAuthApiErrorToAction(error)
    }
}

export const TOUCH_TOKEN_REQUEST = 'TOUCH_TOKEN_REQUEST'
const touchTokenRequest = () => {
    return { type: TOUCH_TOKEN_REQUEST }
}

export const TOUCH_TOKEN_SUCCESS = 'TOUCH_TOKEN_SUCCESS'
const touchTokenSuccess = (response) => {
    return {
        type: TOUCH_TOKEN_SUCCESS,
        ...mapAuthApiResponseToAction(response)
    }
}

export const TOUCH_TOKEN_FAILURE = 'TOUCH_TOKEN_FAILURE'
const touchTokenFailure = (error) => {
    return {
        type: TOUCH_TOKEN_FAILURE,
        ...mapAuthApiErrorToAction(error)
    }
}

const checkStatus = (response) => {
    if (response.ok) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export const login = (email, password) => {
    return (dispatch) => {
        dispatch(loginRequest());
        return fetch(authEndpoint, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ email, password })
        })
            .then(checkStatus)
            .then(response => response.json())
            .then(data => dispatch(loginSuccess(data)))
            .catch(error => dispatch(loginFailure(error)))
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
            .then(checkStatus)
            .then(response => dispatch(logoutSuccess()))
            .catch(error => dispatch(logoutFailure(error)))
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
            .then(checkStatus)
            .then(response => response.json())
            .then(data => dispatch(touchTokenSuccess(data)))
            .catch(error => dispatch(touchTokenFailure(error)))
    }
}