import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as bs from 'react-bootstrap'

import * as authActions from '../../api/users/auth/actions'
import * as actions from './actions'

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

    componentDidMount() { this.props.clearErrors() }

    // Input event handlers
    handleEmailChange(event) { this.setState({email: event.target.value}) }
    handlePasswordChange(event) { this.setState({password: event.target.value}) }
    handleSubmission(event) {
        event.preventDefault()
        this.props.login(this.state.email, this.state.password)
    }

    _form = (authError) => {
        return (
            <div>
                <h1>Log in</h1>
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
                        className="pull-right"
                        disabled={this.props.loading}>
                        Log in
                    </bs.Button>
                </form>
            </div>
        )
    }

    render () {
        return this._form(this.props.errors.auth)
    }

}

const mapStateToProps = (state) => ({
    loading: state.api.users.auth.loading,
    errors: state.ux.login.errors
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    login(email, password) {
        dispatch(authActions.login(email, password))
            .then((action) => {
                if (action.type === authActions.LOGIN_SUCCESS) {
                    dispatch(push(ownProps.redirectTarget))
                }
            })
        },
    clearErrors() { dispatch(actions.clearLoginErrors()) }
})

Form = connect(mapStateToProps, mapDispatchToProps)(Form)

Form.propTypes = {
    redirectTarget: React.PropTypes.string.isRequired
}

Form.defaultProps = {
    redirectTarget: "/account"
}

export default Form