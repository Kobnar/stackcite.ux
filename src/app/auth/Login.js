import React, { Component } from 'react'

import LoginForm from './LoginForm'

import './css/auth.css';

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