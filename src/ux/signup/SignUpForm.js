import React, { Component } from 'react'

import { InputGroup } from 'ux/Forms'

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

        console.log(this.props.errors.email)

        if (this.props.errors.request === 409)
            emailError = 'This email is already registered.'

        return (
            <div>
                <h1 className='page-title'>Sign up</h1>
                <form onSubmit={this.handleSubmission}>
                    <fieldset>
                        <InputGroup
                            id='email'
                            type='email'
                            label='Email'
                            value={this.state.email}
                            error={!!emailError}
                            errorMsg={emailError}
                            onChange={this.handleEmailChange} />

                        <InputGroup
                            id='password'
                            type='password'
                            label='Password'
                            value={this.state.password}
                            error={!!passwordError}
                            errorMsg={passwordError}
                            onChange={this.handlePasswordChange} />
                        
                        <input
                            type='submit'
                            className='button-primary'
                            disabled={this.props.loading}
                            value='Sign up'/>
                    </fieldset>
                </form>
            </div>
        )
    }

    static propTypes = propTypes
    static defaultProps = defaultProps
}

export default SignUpForm