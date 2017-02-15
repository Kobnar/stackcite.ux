import React, { Component } from 'react'

import { InputGroup } from 'ux/Forms'

const propTypes = {
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object,
    onSubmit: React.PropTypes.func.isRequired
}

class LoginForm extends Component {

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

        if (Object.keys(this.props.errors).length)
            var authError = 'Authentication failed.'

        return (
            <div>
                <h1 className="page-title">Log in</h1>
                <form onSubmit={this.handleSubmission}>
                    <fieldset>
                        <InputGroup
                            id='email'
                            type='email'
                            label='Email'
                            value={this.state.email}
                            error={authError}
                            onChange={this.handleEmailChange} />

                        <InputGroup
                            id='password'
                            type='password'
                            label='Password'
                            value={this.state.password}
                            error={authError}
                            errorMsg={authError}
                            onChange={this.handlePasswordChange} />
                        
                        <input
                            type='submit'
                            className='button-primary'
                            disabled={this.props.loading}
                            value='Log in'/>

                    </fieldset>
                </form>
            </div>
        )
    }

    static propTypes = propTypes
}

export default LoginForm