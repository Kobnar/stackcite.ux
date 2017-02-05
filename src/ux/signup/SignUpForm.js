import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as bs from 'react-bootstrap'

const propTypes = {
    redirectTarget: React.PropTypes.string.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object,
    onSubmit: React.PropTypes.func
}

const defaultProps = {
    redirectTarget: '/'
}

class SignUpForm extends Component
{
    constructor(props) {
        super(props);

        // Set initial form state
        this.state = {
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
        this.props.onSubmit(this.state.email, this.state.password)
    }

    render () {
        var emailError = this.props.errors.email
        var passwordError = this.props.errors.password

        if (this.props.errors.request === 409)
            emailError = 'This email is already registered.'

        return (
            <div className='auth-container'>
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

    static propTypes = propTypes
    static defaultProps = defaultProps
}

export default SignUpForm