import React, { Component } from 'react'

import Form from './Form'

import '../css/auth.css'

class Login extends Component
{
    render () {
        return (
            <div className="auth-container">
                <Form redirectTarget={this.props.location.query.redirect} />
            </div>
        )
    }
}

export default Login