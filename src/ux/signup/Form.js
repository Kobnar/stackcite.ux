import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import * as authActions from '../../api/users/actions'
import * as actions from './actions'

import '../css/auth.css'

class Form extends Component
{
    constructor(props) {
        super(props);

        // Set initial form state
        this.state = {
            submitted: false,
            email: '',
            password: ''
        }
    }

    componentDidMount() { this.props.clearForm() }

    // Input event handlers
    handleEmailChange(event) { this.setState({email: event.target.value}) }
    handlePasswordChange(event) { this.setState({password: event.target.value}) }
    handleSubmission(event) {
        event.preventDefault();
        this.props.signup(this.state.email, this.state.password)
    }

    _form = (emailErrors, passwordErrors) => {
        var emailErrorMsg = this.props.errors.email
        var passwordErrorMsg = this.props.errors.password

        return (
            <div>
                <h4>Sign up</h4>
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
            </div>
        )
    }

    _success = () => {
        return (
            <div>
                <h4>Success!</h4>
                <p>A confirmation link has been sent to {this.state.email}.</p>
            </div>
        )
    }

    render () {

        if (!this.props.complete)
            return this._form()
        else
            return this._success()
    }
}

const mapStateToProps = (state) => ({
    loading: state.api.users.loading,
    errors: state.ux.signup.errors,
    complete: state.ux.signup.complete
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    signup(email, password) {
        dispatch(authActions.signup(email, password))
    },
    clearForm() { dispatch(actions.clearSignupForm()) }
})

Form = connect(mapStateToProps, mapDispatchToProps)(Form)

Form.propTypes = {
    redirectTarget: React.PropTypes.string.isRequired
}

Form.defaultProps = {
    redirectTarget: "/"
}

export default Form