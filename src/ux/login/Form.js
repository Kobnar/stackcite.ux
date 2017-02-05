import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as bs from 'react-bootstrap'

import api from 'api'
import { SUCCESS } from 'api/actions'
import { AUTH } from 'api/users/auth/actions'
import { login } from 'ux/auth/actions'

const propTypes = {
    redirectTarget: React.PropTypes.string.isRequired
}

const defaultProps = {
    redirectTarget: '/'
}

class Form extends Component {

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
        this.props.dispatch(login(this.state.email, this.state.password))
            .then(action => {
                if (action.status === SUCCESS)
                    this.props.dispatch(push(this.props.redirectTarget))
            })
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
}

const mapStateToProps = (state) => ({
    errors: state.ux.auth.errors
})

Form = connect(mapStateToProps)(Form)

Form.propTypes = propTypes
Form.defaultProps = defaultProps

export default Form