import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import * as authActions from '../../api/users/auth/actions'
import * as actions from './actions'

class LoginForm extends Component
{
    constructor(props) {
        super(props);

        // Set initial form state
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() { this.props.clearErrors() }

    // Input event handlers
    handleEmailChange(event) { this.setState({email: event.target.value}) }
    handlePasswordChange(event) { this.setState({password: event.target.value}) }
    handleSubmission(event) {
        event.preventDefault()
        this.props.login(this.state.email, this.state.password)
    }

    render () {
        var authErrorMsg = this.props.errors.auth

        return (
            <form onSubmit={this.handleSubmission.bind(this)}>

                <label htmlFor="email">Email address:</label>
                <input
                    id="email"
                    type="email"
                    className={ authErrorMsg ? "u-full-width has-error" : "u-full-width"}
                    placeholder="user@example.com"
                    value={this.state.email}
                    onChange={this.handleEmailChange.bind(this)}/>

                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    className={ authErrorMsg ? "u-full-width has-error" : "u-full-width"}
                    value={this.state.password}
                    onChange={(this.handlePasswordChange.bind(this))} />
                
                { authErrorMsg ? <p className="has-error">{authErrorMsg}</p> : null }

                <input
                    type="submit"
                    className="button-primary u-pull-right"
                    value="Submit"
                    disabled={this.props.loading} />
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.api.users.auth.loading,
    errors: state.ux.login.errors
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    login(email, password) {
        dispatch(authActions.login(email, password))
            .then((action) => {
                if (action.type === authActions.LOGIN_SUCCESS) {
                    dispatch(push(ownProps.redirectTarget))
                }
            })
        },
    clearErrors() { dispatch(actions.clearLoginErrors()) }
})

LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

LoginForm.propTypes = {
    redirectTarget: React.PropTypes.string.isRequired
}

LoginForm.defaultProps = {
    redirectTarget: "/account"
}

export default LoginForm