import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as bs from 'react-bootstrap'

import * as usersActions from '../../api/users/actions'
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

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmission = this.handleSubmission.bind(this)
    }

    componentDidMount() { this.props.clearForm() }

    handleEmailChange(event) { this.setState({email: event.target.value}) }
    handlePasswordChange(event) { this.setState({password: event.target.value}) }
    handleSubmission(event) {
        event.preventDefault();
        this.props.signup(this.state.email, this.state.password)
    }

    _form = (emailError, passwordError) => {
        return (
            <div>
                <h1>Sign up</h1>
                <form onSubmit={this.handleSubmission}>

                    <bs.FormGroup
                        validationState={ emailError ? 'error' : null }>
                        <bs.ControlLabel
                            className="sr-only">
                            Email address
                        </bs.ControlLabel>
                        <bs.FormControl
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleEmailChange}/>
                        <bs.HelpBlock>{emailError}</bs.HelpBlock>
                    </bs.FormGroup>

                    <bs.FormGroup
                        validationState={ passwordError ? 'error' : null }>
                        <bs.ControlLabel
                            className="sr-only">
                            Password
                        </bs.ControlLabel>
                        <bs.FormControl
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}/>
                        <bs.HelpBlock>{passwordError}</bs.HelpBlock>
                    </bs.FormGroup>

                    <bs.Button
                        block
                        type="submit"
                        bsStyle="primary"
                        disabled={this.props.loading}>
                        Sign up
                    </bs.Button>
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
            return this._form(
                this.props.errors.email,
                this.props.errors.password)
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
        dispatch(usersActions.createUser(email, password))
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