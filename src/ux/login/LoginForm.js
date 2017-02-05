import React, { Component } from 'react'
import * as bs from 'react-bootstrap'

const propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object
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

                    <bs.FormGroup
                        validationState={ authError ? 'error' : null }>
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
                    </bs.FormGroup>

                    <bs.FormGroup
                        validationState={ authError ? 'error' : null }>
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
                    </bs.FormGroup>

                    <bs.FormGroup
                        validationState={ authError ? 'error' : null }>
                        <bs.HelpBlock>{authError}</bs.HelpBlock>
                    </bs.FormGroup>

                    <bs.Button
                        block
                        type="submit"
                        bsStyle="primary"
                        disabled={this.props.loading}>
                        Log in
                    </bs.Button>
                </form>
            </div>
        )
    }

    static propTypes = propTypes
}

export default LoginForm