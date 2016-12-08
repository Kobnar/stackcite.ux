import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

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
                <input className="u-full-width" type="email" placeholder="user@example.com" id="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
                <label htmlFor="password">Password:</label>
                <input className="u-full-width" type="password" id="password" value={this.state.password} onChange={(this.handlePasswordChange.bind(this))} />
                <input className="button-primary u-pull-right" type="submit" value="Submit" disabled={this.props.loading} />
            </form>
        );
    }

    static propTypes = {
        redirectTarget: React.PropTypes.string.isRequired
    }
    
    static defaultProps = {
        redirectTarget: "/account"
    }
}

const mapStateToProps = (state) => ({
    loading: state.app.auth.loading
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    login(email, password) {
        dispatch(actions.login(email, password))
            .then(dispatch(push(ownProps.redirectTarget)))
        }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)