import fetch from 'isomorphic-fetch'

// TODO: Abstract general endpoint URI
const usersEndpoint = 'http://api.localhost/v0/users/'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
const signupRequest = () => ({ type: SIGNUP_REQUEST })

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const signupSuccess = () => ({ type: SIGNUP_SUCCESS })

export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
const signupFailure = (error) => {
    if (error.code === 409) {
        return {
            type: SIGNUP_FAILURE,
            errors: { email: ['This email address is already registered.'] }
        }
    } else {
        return {
            type: SIGNUP_FAILURE,
            errors: { password: ['This is an invalid password.'] }
        }
    }
}

export const signup = (email, password) => {
    return (dispatch) => {
        dispatch(signupRequest())
        return fetch(usersEndpoint, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ email, password })
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                        .then(data => dispatch(signupSuccess(data)))
                } else {
                    return response.json()
                        .then(error => dispatch(signupFailure(error)))
                }
    
            })
    }
}