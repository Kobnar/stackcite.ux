import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as userActions from '../../api/users/actions'

import Form from './Form.js'

import './css/account.css'

class Account extends Component {
    handleEmailChange(event) { this.setState({email: event.target.value}) }
    handlePasswordChange(event) { this.setState({password: event.target.value}) }
    handleNewPasswordChange(event) { this.setState({newPassword: event.target.value}) }
    handleSubmission(event) {
        event.preventDefault();

        var formData = {}
        for (var field in this.state) {
            var value = this.state[field]
            if (value !== "") {
                formData[field] = value
            }
        }
        
        this.props.updateUser(this.props.tokenKey, this.props.userId, formData)
    }

    render () {
        return (
            <div className="container">
                <Form userId={this.props.userId} tokenKey={this.props.tokenKey}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userId: state.api.users.auth.user.id,
    tokenKey: state.api.users.auth.token.key
})

export default connect(mapStateToProps)(Account)