import React, { Component } from 'react'

import Form from './Form'

import 'ux/css/auth.css'

class Login extends Component
{
    render () {
        var redirectTarget = this.props.location.query.redirect
        return (
            <div className="auth-container">
                <Form redirectTarget={redirectTarget} />
            </div>
        )
    }
}

export default Login