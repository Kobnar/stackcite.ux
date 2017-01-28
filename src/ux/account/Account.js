import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as userActions from '../../api/users/actions'

import './css/account.css'

class Account extends Component {

    constructor(props) {
        super(props);

        // Set initial form state
        this.state = {
            email: '',
            password: '',
            newPassword: '',
            groups: {
                users: false,
                staff: false,
                admin: false
            }
        }
    }

    componentDidMount() {
        this.props.getUser(this.props.tokenKey, this.props.userId)
    }

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
                <h4>Account Settings</h4>

                <div className="settings-container">
                    <h5>Profile</h5>
                    <form onSubmit={this.handleSubmission.bind(this)}>
                        <div className="row">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                className="u-full-width"
                                placeholder={this.props.user.email}
                                onChange={this.handleEmailChange.bind(this)}/>
                        </div>
                    </form>
                </div>

                <div className="settings-container">
                    <h5>Security</h5>
                    <form>
                        <div className="row">
                            <label htmlFor="new-password">New password</label>
                            <input
                                id="new-password"
                                type="password"
                                className="u-full-width"
                                onChange={this.handleNewPasswordChange.bind(this)}/>
                        </div>
                        <div className="row">
                            <label htmlFor="password">Old password</label>
                            <input
                                id="password"
                                type="password"
                                className="u-full-width"
                                onChange={this.handlePasswordChange.bind(this)}/>
                        </div>
                        <div className="row">
                            <label>Groups</label>
                            <label>
                                <input name="users" value={this.state.groups.users} type="checkbox"/>
                                <span className="label-body">Users</span>
                            </label>
                            <label>
                                <input name="staff" value={this.state.groups.users} type="checkbox"/>
                                <span className="label-body">Staff</span>
                            </label>
                            <label>
                                <input name="admin" value={this.state.groups.users} type="checkbox"/>
                                <span className="label-body">Administrators</span>
                            </label>
                        </div>
                    </form>
                </div>

                <div className="settings-container">
                    <h5>Stats</h5>
                    <div className="row">
                        <p><strong>Joined:</strong> {this.props.user.joined}</p>
                    </div>
                    <div className="row">
                        <p><strong>Last login:</strong> {this.props.user.previous_login}</p>
                    </div>
                </div>

                <div className="settings-container">
                    <form onSubmit={this.handleSubmission.bind(this)}>
                        <input
                            type="submit"
                            value="Submit"
                            className="button-primary"/>
                    </form>
                </div>
                
                <div className="settings-container">
                    <h5>Delete Account</h5>
                    <button onClick={() => this.props.deleteUser(this.props.tokenKey, this.props.userId)}>Delete Account</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.ux.account.user,
    userId: state.api.users.auth.user.id,
    tokenKey: state.api.users.auth.token.key
})

const mapDispatchToProps = (dispatch) => ({
    getUser(tokenKey, userId) { dispatch(userActions.getUser(tokenKey, userId)) },
    updateUser(tokenKey, userId, data) { dispatch(userActions.updateUser(tokenKey, userId, data)) },
    deleteUser(tokenKey, userId) { dispatch(userActions.deleteUser(tokenKey, userId)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)