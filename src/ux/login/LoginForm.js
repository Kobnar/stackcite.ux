import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import * as actions from '../../api/users/auth/actions'

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

    // Input event handlers
    handleEmailChange(event) { this.setState({email: event.target.value}) }
    handlePasswordChange(event) { this.setState({password: event.target.value}) }
    handleSubmission(event) {
        event.preventDefault();
        this.props.login(this.state.email, this.state.password)
    }

    render () {
        return (
            <form onSubmit={this.handleSubmission.bind(this)}>
                <label htmlFor="email">Email address:</label>
                <input
                    id="email"
                    type="email"
                    className="u-full-width"
                    placeholder="user@example.com"
                    value={this.state.email}
                    onChange={this.handleEmailChange.bind(this)}/>

                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    className="u-full-width"
                    value={this.state.password}
                    onChange={(this.handlePasswordChange.bind(this))} />

                <input
                    type="submit"
                    className="button-primary u-pull-right"
                    value="Submit"
                    disabled={this.props.loading} />
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.api.users.auth.loading,
    errors: state.api.users.auth.errors
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    login(email, password) {
        dispatch(actions.login(email, password))
            .then(dispatch(push(ownProps.redirectTarget)))
        }
})

LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

LoginForm.propTypes = {
    redirectTarget: React.PropTypes.string.isRequired
}

LoginForm.defaultProps = {
    redirectTarget: "/account"
}

export default LoginForm