import React, { Component } from 'react'

import SignupForm from './SignupForm'
import Confirm from './confirm/Confirm'

import '../css/auth.css'

class Signup extends Component {

    _signup = (
        <div className="auth-container">
            <h4>Sign up</h4>
            <SignupForm />
        </div>
    )

    _confirm = (confirmKey) => (
        <div className="auth-container">
            <Confirm confirmKey={confirmKey}/>
        </div>
    )

    render () {
        var confirmKey = this.props.location.query.confirm
        if (confirmKey) {
            return this._confirm(confirmKey)
        } else {
            return this._signup
        }
    }
}

export default Signup