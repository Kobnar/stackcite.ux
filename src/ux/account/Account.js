import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
    retrieveUser,
    updateUser,
    deleteUser } from './actions'

import AccountSettings from './AccountSettings'
import DeleteAccount from './DeleteAccount'

import './css/account.css'

class Account extends Component {

    constructor (props) {
        super(props)

        this.retrieve = this.retrieve.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    componentWillMount () {
        this.retrieve()
    }

    retrieve () {
        this.props.dispatch(
            retrieveUser(this.props.userId, this.props.authKey))
    }

    update (data) {
        this.props.dispatch(
            updateUser(data, this.props.userId, this.props.authKey))
    }

    delete () {
        this.props.dispatch(
            deleteUser(this.props.userId, this.props.authKey))
                .then(this.props.dispatch(push('/')))
    }

    render () {
        if (this.props.user.id)
            return (
                <div className="container">
                    <AccountSettings
                        user={this.props.user}
                        loading={this.props.loading}
                        errors={this.props.errors}
                        onSubmit={this.update} />
                    
                    <DeleteAccount
                        loading={this.props.loading}
                        onSubmit={this.delete} />
                </div>
            )
        else
            return <p>Loading...</p>
    }
}

const mapStateToProps = (state) => ({
    userId: state.api.auth.user.id,
    authKey: state.api.auth.token.key,
    user: state.ux.account.user,
    loading: state.ux.account.loading,
    errors: state.ux.account.errors
})

export default connect(mapStateToProps)(Account)