import fetch from 'isomorphic-fetch'

// TODO: Abstract general endpoint URI
const usersEndpoint = 'http://api.localhost/v0/users/'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
const signupRequest = () => ({ type: SIGNUP_REQUEST })

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const signupSuccess = () => ({ type: SIGNUP_SUCCESS })

export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
const signupFailure = (error) => ({
    type: SIGNUP_FAILURE,
    errors: error.detail
})

export const signup = (email, password) => {
    return (dispatch) => {
        dispatch(signupRequest())
        return fetch(usersEndpoint, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ email, password })
        })
            // Insert promises for success/fail
            .then(response => {
                if (response.status === 201) {
                    return Promise.resolve(response.json())
                } else {
                    return Promise.reject(response.json())
                }
            })
            .then(data => dispatch(signupSuccess(data)))
            .catch(error => dispatch(signupFailure(error)))
    }
}