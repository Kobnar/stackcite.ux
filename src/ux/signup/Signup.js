import React, { Component } from 'react'

import SignupForm from './SignupForm'

class Signup extends Component
{
    render () {
        return (
            <div className="auth-container">
                <h4>Sign up</h4>
                <SignupForm />
            </div>
        )
    }
}

export default Signup