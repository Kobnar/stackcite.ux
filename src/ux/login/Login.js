import React, { Component } from 'react'

import LoginForm from './LoginForm'

class Login extends Component
{
    render () {
        return (
            <div className="auth-container">
                <h4>Log in</h4>
                <LoginForm redirectTarget={this.props.location.query.redirect} />
            </div>
        )
    }
}

export default Login