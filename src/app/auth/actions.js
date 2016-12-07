// Maps API response from /v0/auth/ to the standard dispatch action pattern
const mapAuthApiResponseToDispatch = (response) => {
    return {
        user: response.user,
        token: {
            key: response.key,
            issued: response.issued,
            touched: response.touched
        }
    }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
const loginRequest = () => {
    return { type: LOGIN_REQUEST }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const loginSuccess = (response) => {
    return {
        type: LOGIN_SUCCESS,
        ...mapAuthApiResponseToDispatch(response)
    }
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE'
const loginFailure = () => {
    return { type: LOGIN_FAILURE }
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
const logoutFailure = () => {
    return { type: LOGOUT_FAILURE }
}

export const TOUCH_TOKEN_REQUEST = 'TOUCH_TOKEN_REQUEST'
const touchTokenRequest = () => {
    return { type: TOUCH_TOKEN_REQUEST }
}

export const TOUCH_TOKEN_SUCCESS = 'TOUCH_TOKEN_SUCCESS'
const touchTokenSuccess = (response) => {
    return {
        type: TOUCH_TOKEN_SUCCESS,
        ...mapAuthApiResponseToDispatch(response)
    }
}

export const TOUCH_TOKEN_FAILURE = 'TOUCH_TOKEN_FAILURE'
const touchTokenFailure = () => {
    return { type: TOUCH_TOKEN_FAILURE }
}

export {
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess, 
    logoutFailure,
    touchTokenRequest,
    touchTokenSuccess,
    touchTokenFailure
}