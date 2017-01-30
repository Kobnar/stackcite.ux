import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as userActions from '../../api/users/actions'

import Form from './Form.js'

import './css/account.css'

class Account extends Component {
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