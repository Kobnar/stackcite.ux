import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { SUCCESS } from 'api/actions'

import { login } from './actions'

import LoginForm from './LoginForm'

class Login extends Component
{
    constructor (props) {
        super (props)

        this.state = {
            redirectTarget: this.props.location.query.redirect || '/'
        }

        this.login = this.login.bind(this)
    }

    login (email, password) {
        this.props.dispatch(login(email, password))
            .then(action => {
                if (action.status === SUCCESS)
                    this.props.dispatch(push(this.state.redirectTarget))
            })
    }

    render () {
        return (
            <div className="auth-container">
                <LoginForm
                    loading={this.props.loading}
                    errors={this.props.errors}
                    onSubmit={this.login} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.ux.login.loading,
    errors: state.ux.login.errors
})

export default connect(mapStateToProps)(Login)