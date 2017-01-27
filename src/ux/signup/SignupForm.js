import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import * as authActions from '../../api/users/actions'
import * as actions from './actions'

class SignupForm extends Component
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
        event.preventDefault();
        this.props.signup(this.state.email, this.state.password)
    }

    render () {
        var emailErrorMsg = this.props.errors.email
        var passwordErrorMsg = this.props.errors.password

        return (
            <form onSubmit={this.handleSubmission.bind(this)}>

                <label htmlFor="email">Email address:</label>
                <input
                    id="email"
                    type="email"
                    className={ emailErrorMsg ? "u-full-width has-error" : "u-full-width"}
                    placeholder="user@example.com"
                    value={this.state.email}
                    onChange={this.handleEmailChange.bind(this)}/>
                { emailErrorMsg ? <p className="has-error">{emailErrorMsg}</p> : null }

                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    className={ passwordErrorMsg ? "u-full-width has-error" : "u-full-width"}
                    value={this.state.password}
                    onChange={(this.handlePasswordChange.bind(this))} />
                { passwordErrorMsg ? <p className="has-error">{passwordErrorMsg}</p> : null }

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
    loading: state.api.users.loading,
    errors: state.ux.signup.errors
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    signup(email, password) {
        dispatch(authActions.signup(email, password))
            .then((action) => {
                if (action.type === authActions.SIGNUP_SUCCESS) {
                    dispatch(push(ownProps.redirectTarget))
                }
            })
    },
    clearErrors() { dispatch(actions.clearSignupErrors()) }
})

SignupForm = connect(mapStateToProps, mapDispatchToProps)(SignupForm)

SignupForm.propTypes = {
    redirectTarget: React.PropTypes.string.isRequired
}

SignupForm.defaultProps = {
    redirectTarget: "/"
}

export default SignupForm