import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as bs from 'react-bootstrap'

import { signup } from './actions'

import 'ux/css/auth.css'

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

    handleEmailChange(event) { this.setState({email: event.target.value}) }
    handlePasswordChange(event) { this.setState({password: event.target.value}) }
    handleSubmission(event) {
        event.preventDefault()
        this.props.dispatch(signup(this.state.email, this.state.password))
    }

    form = (errors) => {
        var emailError = errors.email
        var passwordError = errors.password

        if (errors.request === 409)
            emailError = 'This email is already registered.'
        
        return (
            <div>
                <h1 className='page-title'>Sign up</h1>
                <form onSubmit={this.handleSubmission}>

                    <bs.FormGroup
                        validationState={ emailError ? 'error' : null }>
                        <bs.ControlLabel
                            className='sr-only'>
                            Email address
                        </bs.ControlLabel>
                        <bs.FormControl
                            id='email'
                            type='email'
                            placeholder='Email'
                            value={this.state.email}
                            onChange={this.handleEmailChange}/>
                        <bs.HelpBlock>{emailError}</bs.HelpBlock>
                    </bs.FormGroup>

                    <bs.FormGroup
                        validationState={ passwordError ? 'error' : null }>
                        <bs.ControlLabel
                            className='sr-only'>
                            Password
                        </bs.ControlLabel>
                        <bs.FormControl
                            id='password'
                            type='password'
                            placeholder='Password'
                            value={this.state.password}
                            onChange={this.handlePasswordChange}/>
                        <bs.HelpBlock>{passwordError}</bs.HelpBlock>
                    </bs.FormGroup>

                    <bs.Button
                        block
                        type='submit'
                        bsStyle='primary'
                        disabled={this.props.loading}>
                        Sign up
                    </bs.Button>
                </form>
            </div>
        )
    }

    success = () => {
        return (
            <div>
                <h4>Success!</h4>
                <p>A confirmation link has been sent to {this.state.email}.</p>
            </div>
        )
    }

    render () {

        if (!this.props.success)
            return this.form(this.props.errors)
        else
            return this.success()
    }
}

const mapStateToProps = (state) => ({
    loading: state.ux.signup.loading,
    errors: state.ux.signup.errors,
    success: state.ux.signup.success
})

Form = connect(mapStateToProps)(Form)

Form.propTypes = {
    redirectTarget: React.PropTypes.string.isRequired
}

Form.defaultProps = {
    redirectTarget: '/'
}

export default Form