import React, { Component } from 'react'

const propTypes = {
    redirectTarget: React.PropTypes.string.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object,
    onSubmit: React.PropTypes.func
}

const defaultProps = {
    redirectTarget: '/'
}

const InputGroup = ({id, type, placeholder, value, error, onChange}) => {
    return (
        <div className='form-group'>
            <label
                htmlFor={id}
                className='sr-only'>
                Email
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className={ error ? 'error' : null }
                value={value}
                onChange={onChange}/>
            { error ? <p className='help-block error'>{error}</p> : null }
        </div>
    )
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
            <div className='auth-container'>
                <h1 className='page-title'>Sign up</h1>
                <form onSubmit={this.handleSubmission}>
                    <fieldset>
                        <InputGroup
                            id='email'
                            type='email'
                            placeholder='Email'
                            value={this.state.email}
                            error={emailError}
                            onChange={this.handleEmailChange} />

                        <InputGroup
                            id='password'
                            type='password'
                            placeholder='Placeholder'
                            value={this.state.password}
                            error={passwordError}
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